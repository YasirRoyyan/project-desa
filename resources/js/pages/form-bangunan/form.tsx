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
import { Home, Building2, MapPin, Ruler, ArrowLeft, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';

interface FormProps {
    type: 'imb' | 'slf' | 'pbg' | 'sertifikat';
}

const permitTypes = {
    imb: {
        title: 'Izin Mendirikan Bangunan (IMB)',
        description: 'Perizinan untuk mendirikan bangunan baru',
        icon: Building2,
        color: 'bg-gradient-to-br from-blue-600 to-indigo-500',
    },
    slf: {
        title: 'Surat Izin Lokasi (SIL)',
        description: 'Perizinan untuk penggunaan lokasi tertentu',
        icon: MapPin,
        color: 'bg-gradient-to-br from-green-600 to-emerald-500',
    },
    pbg: {
        title: 'Pendaftaran Bangunan Gedung',
        description: 'Pendaftaran untuk bangunan yang sudah berdiri',
        icon: Home,
        color: 'bg-gradient-to-br from-amber-600 to-orange-500',
    },
    sertifikat: {
        title: 'Sertifikat Laik Fungsi (SLF)',
        description: 'Sertifikat kelayakan fungsi bangunan',
        icon: Landmark,
        color: 'bg-gradient-to-br from-purple-600 to-pink-500',
    },
};

const dropdownOptions = {
    status_tanah: [
        { value: 'sertifikat', label: 'Sertifikat Hak Milik' },
        { value: 'hgb', label: 'Hak Guna Bangunan' },
        { value: 'hgu', label: 'Hak Guna Usaha' },
        { value: 'sewa', label: 'Sewa Menyewa' },
        { value: 'lainnya', label: 'Lainnya' },
    ],
    jenis_bangunan: [
        { value: 'rumah_tinggal', label: 'Rumah Tinggal' },
        { value: 'kantor', label: 'Kantor' },
        { value: 'toko', label: 'Toko/Ruko' },
        { value: 'industri', label: 'Industri' },
        { value: 'sosial', label: 'Sosial' },
    ],
    satuan_luas: [
        { value: 'm2', label: 'm²' },
        { value: 'ha', label: 'Hektar' },
    ],
};

interface BuildingPermitFormProps {
    type: string;
}

export default function BuildingPermitForm({ type }: BuildingPermitFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    
    const { data, setData, post, processing, errors } = useForm({
        // Data Pemohon
        nama_pemohon: '',
        nik: '',
        alamat: '',
        no_hp: '',
        email: '',
        
        // Data Tanah
        alamat_tanah: '',
        luas_tanah: '',
        satuan_luas: 'm2',
        status_tanah: '',
        no_sertifikat: '',
        
        // Data Bangunan
        jenis_bangunan: '',
        luas_bangunan: '',
        tinggi_bangunan: '',
        jumlah_lantai: '1',
        
        // Data Pendukung
        dokumen_ktp: null as File | null,
        dokumen_kk: null as File | null,
        dokumen_sertifikat_tanah: null as File | null,
        gambar_rencana: null as File | null,
        surat_kuasa: null as File | null,
        
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

        post(route(`permohonan.bangunan.${type}.store`), {
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

    const PermitIcon = permitTypes[type as keyof typeof permitTypes]?.icon || Building2;
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
                                            <Label htmlFor="nama_pemohon">Nama Lengkap</Label>
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
                                            <Label htmlFor="alamat">Alamat</Label>
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
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Data Tanah</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="alamat_tanah">Alamat Tanah</Label>
                                            <Textarea
                                                id="alamat_tanah"
                                                value={data.alamat_tanah}
                                                onChange={(e) => setData('alamat_tanah', e.target.value)}
                                                placeholder="Masukkan alamat lengkap lokasi tanah"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-2 space-y-2">
                                                <Label htmlFor="luas_tanah">Luas Tanah</Label>
                                                <Input
                                                    id="luas_tanah"
                                                    type="number"
                                                    value={data.luas_tanah}
                                                    onChange={(e) => setData('luas_tanah', e.target.value)}
                                                    placeholder="0"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Satuan</Label>
                                                <Select
                                                    value={data.satuan_luas}
                                                    onValueChange={(value) => setData('satuan_luas', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {dropdownOptions.satuan_luas.map((option) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="status_tanah">Status Tanah</Label>
                                            <Select
                                                value={data.status_tanah}
                                                onValueChange={(value) => setData('status_tanah', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih status tanah" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dropdownOptions.status_tanah.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="no_sertifikat">Nomor Sertifikat</Label>
                                            <Input
                                                id="no_sertifikat"
                                                value={data.no_sertifikat}
                                                onChange={(e) => setData('no_sertifikat', e.target.value)}
                                                placeholder="Masukkan nomor sertifikat"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Data Bangunan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="jenis_bangunan">Jenis Bangunan</Label>
                                            <Select
                                                value={data.jenis_bangunan}
                                                onValueChange={(value) => setData('jenis_bangunan', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenis bangunan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dropdownOptions.jenis_bangunan.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="luas_bangunan">Luas Bangunan (m²)</Label>
                                            <Input
                                                id="luas_bangunan"
                                                type="number"
                                                value={data.luas_bangunan}
                                                onChange={(e) => setData('luas_bangunan', e.target.value)}
                                                placeholder="0"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tinggi_bangunan">Tinggi Bangunan (m)</Label>
                                            <Input
                                                id="tinggi_bangunan"
                                                type="number"
                                                value={data.tinggi_bangunan}
                                                onChange={(e) => setData('tinggi_bangunan', e.target.value)}
                                                placeholder="0"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="jumlah_lantai">Jumlah Lantai</Label>
                                            <Input
                                                id="jumlah_lantai"
                                                type="number"
                                                value={data.jumlah_lantai}
                                                onChange={(e) => setData('jumlah_lantai', e.target.value)}
                                                min="1"
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
                                            <Label>Sertifikat Tanah</Label>
                                            <FileUpload
                                                file={data.dokumen_sertifikat_tanah}
                                                onFileChange={(file) => setData('dokumen_sertifikat_tanah', file)}
                                                accept="image/*,.pdf"
                                                required
                                            />
                                            <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 5MB)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Gambar Rencana</Label>
                                            <FileUpload
                                                file={data.gambar_rencana}
                                                onFileChange={(file) => setData('gambar_rencana', file)}
                                                accept="image/*,.pdf,.dwg"
                                                required
                                            />
                                            <p className="text-xs text-gray-500">Format: JPG, PNG, PDF, atau DWG (maks. 5MB)</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Surat Kuasa (Jika Dikuasakan)</Label>
                                            <FileUpload
                                                file={data.surat_kuasa}
                                                onFileChange={(file) => setData('surat_kuasa', file)}
                                                accept="image/*,.pdf"
                                            />
                                            <p className="text-xs text-gray-500">Format: JPG, PNG, atau PDF (maks. 2MB)</p>
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
