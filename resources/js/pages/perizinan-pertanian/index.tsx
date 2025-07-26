import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCrudToast } from '@/hooks/useToast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Droplets, HandHeart, ListFilter, Sprout, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

// Define interfaces for your data
interface SuratItem {
    id: number;
    status: 'diproses' | 'disetujui' | 'ditolak' | 'dicetak';
    penduduk_id?: number;
    nomor_surat?: string;
    nama_penduduk?: string; // Tambahan untuk nama dari relasi penduduk
    form: {
        nama?: string;
        nama_usaha?: string;
        [key: string]: any;
    };
    format: {
        url_surat?: string;
        name?: string;
        id: number;
    };
    penduduk?: {
        id: number;
        nama: string;
        [key: string]: any;
    };
    created_at: string;
    updated_at: string;
}

interface StatusCounts {
    total: number;
    diproses: number;
    disetujui: number;
    ditolak: number;
}

interface ApiResponse {
    message: string;
    total: number;
    diproses: number;
    disetujui: number;
    ditolak: number;
    data: SuratItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Manajemen Perizinan Pertanian',
        href: '/perizinan-pertanian',
    },
];

const permitTypes = [
    { key: 'pengelolaanlahan', label: 'Surat Pengelolaan Lahan', icon: Sprout },
    { key: 'permohonanbantuan', label: 'Surat Permohonan Bantuan', icon: HandHeart },
    { key: 'suratketeranganpetani', label: 'Surat Keterangan Petani', icon: UserCheck },
    { key: 'suratizinirigasi', label: 'Surat Izin Irigasi', icon: Droplets },
];

export default function PerizinanPertanian() {
    const [activeTab, setActiveTab] = useState('pengelolaanlahan');
    const [tabData, setTabData] = useState<SuratItem[]>([]);
    const [statusCounts, setStatusCounts] = useState<StatusCounts>({
        total: 0,
        diproses: 0,
        disetujui: 0,
        ditolak: 0,
    });
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState<SuratItem | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const statusOptions = ['diproses', 'disetujui', 'ditolak', 'dicetak'];

    const { deleteSuccess, deleteError } = useCrudToast();

    // Mapping slug ke format_id sesuai database Anda
    const formatIdMap: Record<string, number> = {
        pengelolaanlahan: 28,
        permohonanbantuan: 29,
        suratketeranganpetani: 30,
        suratizinirigasinib: 31,
    };

    // Fetch data for active tab using format_id
    const fetchData = async (tabKey: string) => {
        setLoading(true);
        try {
            const formatId = formatIdMap[tabKey];
            if (!formatId) {
                throw new Error(`Format ID not found for tab: ${tabKey}`);
            }

            const response = await axios.get<ApiResponse>(`/api/surat/format/${formatId}`);
            const { data, total, diproses, disetujui, ditolak } = response.data;

            setTabData(data);
            setStatusCounts({ total, diproses, disetujui, ditolak });

            console.log(`Data loaded for ${tabKey} (format_id: ${formatId}):`, {
                total,
                dataCount: data.length,
            });
        } catch (error) {
            console.error(`Failed to fetch data for ${tabKey}:`, error);
            setTabData([]);
            setStatusCounts({ total: 0, diproses: 0, disetujui: 0, ditolak: 0 });
        } finally {
            setLoading(false);
        }
    };

    // Handle delete action
    const handleDelete = async (item: SuratItem) => {
        setSelectedData(item);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedData) return;

        setIsDeleting(true);
        try {
            await axios.delete(`/api/surat/${selectedData.id}`);

            // Refresh data after successful delete
            await fetchData(activeTab);

            setIsDeleteModalOpen(false);
            setSelectedData(null);
            deleteSuccess('Data perizinan');
        } catch (error) {
            console.error('Delete error:', error);
            deleteError('Terjadi kesalahan saat menghapus data perizinan');
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle view action (placeholder)
    const handleView = (item: SuratItem) => {
        setSelectedData(item);
        setIsDetailModalOpen(true);
    };

    // Handle edit action (placeholder)
    const handleEdit = (item: SuratItem) => {
        setSelectedData(item);
        setIsEditModalOpen(true);
    };

    // Fetch data when active tab changes
    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    // Define table columns
    const columns = [
        {
            name: 'No. Surat',
            selector: (row: SuratItem) => row.nomor_surat || '-',
            sortable: true,
            width: '150px',
        },
        {
            name: 'Nama Pemohon',
            selector: (row: SuratItem) => row.penduduk?.nama || '-',
            sortable: true,
            cell: (row: SuratItem) => (
                <div className="py-2">
                    <div className="font-medium">{row.penduduk?.nama || row.form?.nama || '-'}</div>
                    {row.penduduk_id && <div className="text-xs text-muted-foreground">ID: {row.penduduk_id}</div>}
                </div>
            ),
        },
        {
            name: 'Status',
            selector: (row: SuratItem) => row.status,
            sortable: true,
            width: '150px',
            cell: (row: SuratItem) => {
                const [isEditing, setIsEditing] = useState(false);
                const [currentStatus, setCurrentStatus] = useState<'diproses' | 'disetujui' | 'ditolak' | 'dicetak'>(row.status);
                const [loading, setLoading] = useState(false);

                const getVariantColor = (status: string) => {
                    switch (status) {
                        case 'diproses':
                            return 'orange';
                        case 'disetujui':
                            return 'green';
                        case 'ditolak':
                            return 'red';
                        case 'dicetak':
                            return 'gray';
                        default:
                            return 'black';
                    }
                };

                const updateStatus = async (newStatus: string) => {
                    try {
                        setLoading(true);
                        const response = await fetch(`/api/surat/${row.id}/status`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                            },
                            body: JSON.stringify({ status: newStatus }),
                        });

                        if (!response.ok) {
                            throw new Error('Gagal memperbarui status');
                        }

                        const result = await response.json();
                        setCurrentStatus((result.status || newStatus) as 'diproses' | 'disetujui' | 'ditolak' | 'dicetak');
                    } catch (error) {
                        alert('Gagal memperbarui status.');
                        console.error(error);
                    } finally {
                        setLoading(false);
                    }
                };

                const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
                    const newStatus = e.target.value;
                    setCurrentStatus(newStatus as 'diproses' | 'disetujui' | 'ditolak' | 'dicetak');
                    setIsEditing(false);
                    await updateStatus(newStatus);
                };

                return isEditing ? (
                    <select
                        value={currentStatus}
                        onChange={handleChange}
                        onBlur={() => setIsEditing(false)}
                        style={{ padding: '4px', borderRadius: '4px' }}
                        autoFocus
                    >
                        {statusOptions.map((option) => (
                            <option key={option} value={option}>
                                {option.toUpperCase()}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span
                        onClick={() => !loading && setIsEditing(true)}
                        style={{
                            cursor: loading ? 'wait' : 'pointer',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            backgroundColor: getVariantColor(currentStatus),
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            display: 'inline-block',
                            opacity: loading ? 0.6 : 1,
                        }}
                        title={loading ? 'Sedang menyimpan...' : 'Klik untuk ubah status'}
                    >
                        {currentStatus.toUpperCase()}
                    </span>
                );
            },
        },
        {
            name: 'Tanggal',
            selector: (row: SuratItem) => new Date(row.created_at).toLocaleDateString('id-ID'),
            sortable: true,
            width: '120px',
        },
        {
            name: 'Aksi',
            width: '150px',
            cell: (row: SuratItem) => (
                <div className="flex items-center gap-2">
                    <button className="px-1 text-sm text-blue-500 hover:underline" onClick={() => handleView(row)} title="Lihat detail">
                        Lihat
                    </button>
                    <button className="px-1 text-sm text-red-500 hover:underline" onClick={() => handleDelete(row)} title="Hapus data">
                        Hapus
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Perizinan Pertanian" />

            <div className="container mx-auto px-6 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Manajemen Perizinan Pertanian</h1>
                        <p className="mt-1 text-muted-foreground">Kelola semua jenis perizinan pertanian dalam satu dashboard</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span>Perizinan Aktif</span>
                        </Badge>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Total Pengajuan</CardTitle>
                            <Sprout className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.total}</div>
                            <p className="text-xs text-muted-foreground">Semua pengajuan perizinan</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Diproses</CardTitle>
                            <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.diproses}</div>
                            <p className="text-xs text-muted-foreground">Sedang dalam proses</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.disetujui}</div>
                            <p className="text-xs text-muted-foreground">Telah disetujui</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statusCounts.ditolak}</div>
                            <p className="text-xs text-muted-foreground">Telah ditolak</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Card className="shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle>Data Perizinan Pertanian</CardTitle>
                        <CardDescription>Kelola semua jenis perizinan pertanian yang diajukan warga</CardDescription>
                    </CardHeader>
                    <CardContent className="px-5">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="mb-8 grid w-full grid-cols-4">
                                {permitTypes.map((permit) => {
                                    const Icon = permit.icon;
                                    const formatId = formatIdMap[permit.key];

                                    return (
                                        <TabsTrigger
                                            key={permit.key}
                                            value={permit.key}
                                            className="flex h-auto flex-col items-center gap-2 p-4"
                                            title={`Format ID: ${formatId}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Icon className="h-4 w-4" />
                                                <span className="text-xs font-medium">{permit.key.toUpperCase()}</span>
                                            </div>
                                            <Badge variant="secondary" className="text-xs">
                                                {statusCounts.total}
                                            </Badge>
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>

                            <TabsContent value={activeTab} className="mt-2">
                                <div className="space-y-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">{permitTypes.find((p) => p.key === activeTab)?.label}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Total {statusCounts.total} pengajuan (Format ID: {formatIdMap[activeTab]})
                                            </p>
                                        </div>
                                        {loading && (
                                            <Badge variant="outline" className="animate-pulse">
                                                Loading...
                                            </Badge>
                                        )}
                                    </div>

                                    <DataTable
                                        data={tabData}
                                        columns={columns}
                                        pagination
                                        highlightOnHover
                                        progressPending={loading}
                                        noDataComponent={
                                            <div className="py-8 text-center text-muted-foreground">
                                                {loading ? 'Memuat data...' : 'Tidak ada data tersedia'}
                                            </div>
                                        }
                                        paginationComponentOptions={{
                                            rowsPerPageText: 'Baris per halaman:',
                                            rangeSeparatorText: 'dari',
                                            noRowsPerPage: false,
                                            selectAllRowsItem: false,
                                        }}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                title="Hapus Data Perizinan"
                description={`Apakah Anda yakin ingin menghapus data perizinan "${selectedData?.form?.nama_usaha || selectedData?.form?.nama || 'ini'}"? Tindakan ini tidak dapat dibatalkan.`}
                isLoading={isDeleting}
            />
        </AppLayout>
    );
}
