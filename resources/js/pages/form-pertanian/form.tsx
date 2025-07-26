import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { TreePine, Wheat, Droplets, Tractor, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';

interface FormProps {
    type: 'saprodi' | 'alsintan' | 'bibit' | 'pupuk';
}

const permitTypes = {
    saprodi: {
        title: 'Permohonan Sarana Produksi Pertanian',
        description: 'Permohonan bantuan sarana produksi pertanian',
        icon: Wheat,
        color: 'bg-gradient-to-br from-green-600 to-emerald-500',
    },
    alsintan: {
        title: 'Permohonan Alat dan Mesin Pertanian',
        description: 'Permohonan bantuan alat dan mesin pertanian',
        icon: Tractor,
        color: 'bg-gradient-to-br from-amber-600 to-orange-500',
    },
    bibit: {
        title: 'Permohonan Bibit Tanaman',
        description: 'Permohonan bantuan bibit tanaman',
        icon: TreePine,
        color: 'bg-gradient-to-br from-lime-600 to-green-500',
    },
    pupuk: {
        title: 'Permohonan Pupuk Bersubsidi',
        description: 'Permohonan pengajuan pupuk bersubsidi',
        icon: Droplets,
        color: 'bg-gradient-to-br from-blue-600 to-cyan-500',
    },
};

const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const dropdownOptions = {
    jenis_komoditas: [
        { value: 'padi', label: 'Padi' },
        { value: 'jagung', label: 'Jagung' },
        { value: 'kedelai', label: 'Kedelai' },
        { value: 'sayuran', label: 'Sayuran' },
        { value: 'buah', label: 'Buah-buahan' },
        { value: 'perkebunan', label: 'Perkebunan' },
    ],
    status_lahan: [
        { value: 'milik_sendiri', label: 'Milik Sendiri' },
        { value: 'sewa', label: 'Sewa' },
        { value: 'plasma', label: 'Plasma' },
        { value: 'lainnya', label: 'Lainnya' },
    ],
    satuan: [
        { value: 'kg', label: 'Kilogram (kg)' },
        { value: 'liter', label: 'Liter' },
        { value: 'unit', label: 'Unit' },
        { value: 'paket', label: 'Paket' },
    ],
};

interface AgriculturePermitFormProps {
    type: string;
}

export default function AgriculturePermitForm({ type }: AgriculturePermitFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    
    const { data, setData, post, processing, errors } = useForm({
        // Data Pemohon
        nama_pemohon: '',
        nik: '',
        alamat: '',
        no_hp: '',
        email: '',
        
        // Data Kelompok Tani (jika ada)
        nama_kelompok: '',
        nama_ketua: '',
        alamat_kelompok: '',
        
        // Data Lahan
        jenis_komoditas: '',
        luas_lahan: '',
        satuan_luas: 'm2',
        alamat_lahan: '',
        status_kepemilikan: '',
        
        // Data Permohonan
        jenis_bantuan: type,
        nama_alsintan: '',
        spesifikasi: '',
        jumlah: '',
        satuan: '',
        tujuan_penggunaan: '',
        
        // Dokumen Pendukung
        dokumen_ktp: null as File | null,
        dokumen_kk: null as File | null,
        dokumen_surat_tanah: null as File | null,
        dokumen_pendukung: null as File | null,
        
        // Lain-lain
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        post(route(`permohonan.pertanian.${type}.store`), {
            onSuccess: () => {
                toast({
                    title: 'Berhasil',
                    description: 'Permohonan berhasil dikirim',
                    variant: 'default',
                });
            },
            onError: () => {
                toast({
                    title: 'Gagal',
                    description: 'Terjadi kesalahan saat mengirim permohonan',
                    variant: 'destructive',
                });
            },
            onFinish: () => {
                setIsLoading(false);
            },
            forceFormData: true,
        });
    };

    const PermitIcon = permitTypes[type as keyof typeof permitTypes]?.icon || Wheat;
    const permitData = permitTypes[type as keyof typeof permitTypes];

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`Permohonan ${permitData?.title || ''}`} />
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                <Button
                    variant="ghost"
                    className="mb-6"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </Button>

                <div className="max-w-4xl mx-auto">
                    <Card className="mb-6">
                        <CardHeader className={cn("text-white", permitData?.color)}>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-white/20">
                                    <PermitIcon className="w-8 h-8" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-bold">
                                        {permitData?.title}
                                    </CardTitle>
                                    <p className="text-sm opacity-90">
                                        {permitData?.description}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Data Pemohon</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_pemohon">Nama Lengkap Pemohon</Label>
                                            <Input
                                                id="nama_pemohon"
                                                value={data.nama_pemohon}
                                                onChange={(e) => setData('nama_pemohon', e.target.value)}
                                                placeholder="Masukkan nama lengkap"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nik">NIK</Label>
                                            <Input
                                                id="nik"
                                                value={data.nik}
                                                onChange={(e) => setData('nik', e.target.value)}
                                                placeholder="Masukkan NIK"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="no_hp">Nomor HP</Label>
                                            <Input
                                                id="no_hp"
                                                value={data.no_hp}
                                                onChange={(e) => setData('no_hp', e.target.value)}
                                                placeholder="Masukkan nomor HP"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="Masukkan email"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="alamat">Alamat Lengkap</Label>
                                            <Textarea
                                                id="alamat"
                                                value={data.alamat}
                                                onChange={(e) => setData('alamat', e.target.value)}
                                                placeholder="Masukkan alamat lengkap"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Data Kelompok Tani (Jika Ada)</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_kelompok">Nama Kelompok Tani</Label>
                                            <Input
                                                id="nama_kelompok"
                                                value={data.nama_kelompok}
                                                onChange={(e) => setData('nama_kelompok', e.target.value)}
                                                placeholder="Masukkan nama kelompok tani"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nama_ketua">Nama Ketua Kelompok</Label>
                                            <Input
                                                id="nama_ketua"
                                                value={data.nama_ketua}
                                                onChange={(e) => setData('nama_ketua', e.target.value)}
                                                placeholder="Masukkan nama ketua kelompok"
                                            />
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="alamat_kelompok">Alamat Kelompok Tani</Label>
                                            <Textarea
                                                id="alamat_kelompok"
                                                value={data.alamat_kelompok}
                                                onChange={(e) => setData('alamat_kelompok', e.target.value)}
                                                placeholder="Masukkan alamat kelompok tani"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Data Lahan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="jenis_komoditas">Jenis Komoditas</Label>
                                            <Select
                                                value={data.jenis_komoditas}
                                                onValueChange={(value) => setData('jenis_komoditas', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenis komoditas" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dropdownOptions.jenis_komoditas.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="luas_lahan">Luas Lahan</Label>
                                                <Input
                                                    id="luas_lahan"
                                                    type="number"
                                                    value={data.luas_lahan}
                                                    onChange={(e) => setData('luas_lahan', e.target.value)}
                                                    placeholder="0"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="satuan_luas">Satuan</Label>
                                                <Select
                                                    value={data.satuan_luas}
                                                    onValueChange={(value) => setData('satuan_luas', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih satuan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="m2">m²</SelectItem>
                                                        <SelectItem value="ha">Hektar</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="status_kepemilikan">Status Kepemilikan Lahan</Label>
                                            <Select
                                                value={data.status_kepemilikan}
                                                onValueChange={(value) => setData('status_kepemilikan', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih status kepemilikan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dropdownOptions.status_lahan.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="alamat_lahan">Alamat Lahan</Label>
                                            <Textarea
                                                id="alamat_lahan"
                                                value={data.alamat_lahan}
                                                onChange={(e) => setData('alamat_lahan', e.target.value)}
                                                placeholder="Masukkan alamat lahan"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Detail Permohonan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {type === 'alsintan' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="nama_alsintan">Nama Alat/Mesin Pertanian</Label>
                                                <Input
                                                    id="nama_alsintan"
                                                    value={data.nama_alsintan}
                                                    onChange={(e) => setData('nama_alsintan', e.target.value)}
                                                    placeholder="Contoh: Traktor, Paddy Mower, dll"
                                                    required={type === 'alsintan'}
                                                />
                                            </div>
                                        )}

                                        {(type === 'saprodi' || type === 'pupuk' || type === 'bibit') && (
                                            <div className="space-y-2">
                                                <Label htmlFor="spesifikasi">Spesifikasi</Label>
                                                <Input
                                                    id="spesifikasi"
                                                    value={data.spesifikasi}
                                                    onChange={(e) => setData('spesifikasi', e.target.value)}
                                                    placeholder="Contoh: Pupuk Urea 50kg, Bibit Padi IR64, dll"
                                                    required
                                                />
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="jumlah">Jumlah</Label>
                                                <Input
                                                    id="jumlah"
                                                    type="number"
                                                    value={data.jumlah}
                                                    onChange={(e) => setData('jumlah', e.target.value)}
                                                    placeholder="0"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="satuan">Satuan</Label>
                                                <Select
                                                    value={data.satuan}
                                                    onValueChange={(value) => setData('satuan', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih satuan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {dropdownOptions.satuan.map((option) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="tujuan_penggunaan">Tujuan Penggunaan</Label>
                                            <Textarea
                                                id="tujuan_penggunaan"
                                                value={data.tujuan_penggunaan}
                                                onChange={(e) => setData('tujuan_penggunaan', e.target.value)}
                                                placeholder="Jelaskan tujuan penggunaan bantuan"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Dokumen Pendukung</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Unggah KTP</Label>
                                            <FileUpload
                                                file={data.dokumen_ktp}
                                                onFileChange={(file) => setData('dokumen_ktp', file)}
                                                accept="image/*,.pdf"
                                                required
                                            />
                                            <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 2MB)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Unggah KK</Label>
                                            <FileUpload
                                                file={data.dokumen_kk}
                                                onFileChange={(file) => setData('dokumen_kk', file)}
                                                accept="image/*,.pdf"
                                                required
                                            />
                                            <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 2MB)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Surat Kepemilikan/Sewa Lahan</Label>
                                            <FileUpload
                                                file={data.dokumen_surat_tanah}
                                                onFileChange={(file) => setData('dokumen_surat_tanah', file)}
                                                accept="image/*,.pdf"
                                                required
                                            />
                                            <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 2MB)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Dokumen Pendukung Lainnya</Label>
                                            <FileUpload
                                                file={data.dokumen_pendukung}
                                                onFileChange={(file) => setData('dokumen_pendukung', file)}
                                                accept="image/*,.pdf"
                                            />
                                            <p className="text-xs text-gray-500">Contoh: Proposal, Surat Rekomendasi, dll (opsional)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="keterangan">Keterangan Tambahan</Label>
                                    <Textarea
                                        id="keterangan"
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                        placeholder="Masukkan keterangan tambahan jika diperlukan"
                                        rows={3}
                                    />
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="flex items-center justify-between">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => window.history.back()}
                                        >
                                            Batal
                                        </Button>
                                        <Button type="submit" disabled={processing || isLoading}>
                                            {isLoading ? 'Mengirim...' : 'Kirim Permohonan'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
