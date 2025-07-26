import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/shared/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Building2, Home, MapPin, Landmark, ArrowRight } from 'lucide-react';

const permitTypes = [
    {
        id: 'imb',
        title: 'Izin Mendirikan Bangunan (IMB)',
        description: 'Perizinan untuk mendirikan bangunan baru sesuai dengan peruntukan lahan',
        icon: Building2,
        color: 'bg-gradient-to-br from-blue-600 to-indigo-500',
        requirements: [
            'Fotokopi KTP dan KK',
            'Sertifikat kepemilikan tanah',
            'Gambar rencana bangunan',
            'Surat kuasa (jika dikuasakan)'
        ]
    },
    {
        id: 'slf',
        title: 'Surat Izin Lokasi (SIL)',
        description: 'Perizinan untuk penggunaan lokasi tertentu sesuai peruntukannya',
        icon: MapPin,
        color: 'bg-gradient-to-br from-green-600 to-emerald-500',
        requirements: [
            'Fotokopi KTP dan KK',
            'Bukti kepemilikan tanah',
            'Peta lokasi',
            'Rencana tata ruang'
        ]
    },
    {
        id: 'pbg',
        title: 'Pendaftaran Bangunan Gedung',
        description: 'Pendaftaran untuk bangunan yang sudah berdiri',
        icon: Home,
        color: 'bg-gradient-to-br from-amber-600 to-orange-500',
        requirements: [
            'Fotokopi KTP dan KK',
            'Sertifikat tanah',
            'IMB (jika ada)',
            'Dokumen kepemilikan bangunan'
        ]
    },
    {
        id: 'sertifikat',
        title: 'Sertifikat Laik Fungsi (SLF)',
        description: 'Sertifikat kelayakan fungsi bangunan',
        icon: Landmark,
        color: 'bg-gradient-to-br from-purple-600 to-pink-500',
        requirements: [
            'Fotokopi KTP dan KK',
            'IMB yang masih berlaku',
            'Bukti pelunasan PBB',
            'Berita acara pemeriksaan bangunan'
        ]
    }
];

export default function FormBangunan() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Layanan Perizinan Bangunan" />
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Layanan Perizinan Bangunan</h1>
                    <p className="text-gray-600">Pilih jenis perizinan bangunan yang Anda butuhkan</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {permitTypes.map((permit, index) => (
                        <motion.div
                            key={permit.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link href={`/layanan/bangunan/${permit.id}`} className="group">
                                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <CardHeader className={cn("text-white rounded-t-lg", permit.color)}>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl font-bold">{permit.title}</CardTitle>
                                            <div className="p-2 rounded-full bg-white/20">
                                                <permit.icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <p className="text-gray-600 mb-4">{permit.description}</p>
                                        
                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Persyaratan:</h4>
                                            <ul className="space-y-1 text-sm text-gray-600">
                                                {permit.requirements.map((req, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="mr-2">•</span>
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-6 flex items-center justify-end">
                                            <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800">
                                                Ajukan Sekarang
                                                <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Penting</h3>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Pastikan semua dokumen persyaratan telah dipersiapkan dalam format yang sesuai.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Proses verifikasi dokumen membutuhkan waktu 5-10 hari kerja.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Setelah pengajuan, tim akan menghubungi Anda untuk verifikasi lebih lanjut.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Untuk bangunan dengan luas lebih dari 500m², diperlukan pengajuan khusus.</span>
                        </li>
                    </ul>
                </div>

                <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                Pastikan data yang Anda berikan akurat dan lengkap. Data yang tidak sesuai dengan fakta dapat mengakibatkan penundaan atau pembatalan proses perizinan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
