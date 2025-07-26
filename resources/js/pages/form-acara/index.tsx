import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/shared/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CalendarDays, Music, Medal, Church, ArrowRight } from 'lucide-react';

const eventTypes = [
    {
        id: 'umum',
        title: 'Kegiatan Umum',
        description: 'Izin penyelenggaraan kegiatan umum seperti seminar, pameran, atau bazar',
        icon: CalendarDays,
        color: 'bg-gradient-to-br from-blue-600 to-indigo-500',
        requirements: [
            'Proposal kegiatan',
            'Susunan panitia',
            'Surat permohonan',
            'Denah lokasi'
        ]
    },
    {
        id: 'hiburan',
        title: 'Hiburan Rakyat',
        description: 'Izin penyelenggaraan hiburan seperti konser, pentas seni, atau festival',
        icon: Music,
        color: 'bg-gradient-to-br from-pink-600 to-rose-500',
        requirements: [
            'Proposal acara',
            'Daftar penampil',
            'Surat izin musik',
            'Rencana pengamanan'
        ]
    },
    {
        id: 'olahraga',
        title: 'Kegiatan Olahraga',
        description: 'Izin penyelenggaraan turnamen atau event olahraga',
        icon: Medal,
        color: 'bg-gradient-to-br from-green-600 to-emerald-500',
        requirements: [
            'Proposal kegiatan',
            'Jadwal pertandingan',
            'Daftar peserta',
            'Surat pernyataan'
        ]
    },
    {
        id: 'keagamaan',
        title: 'Kegiatan Keagamaan',
        description: 'Izin penyelenggaraan acara keagamaan',
        icon: Church,
        color: 'bg-gradient-to-br from-amber-600 to-orange-500',
        requirements: [
            'Surat permohonan',
            'Jadwal acara',
            'Dokumen pendukung',
            'Surat rekomendasi'
        ]
    }
];

export default function FormAcara() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Layanan Perizinan Acara" />
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Layanan Perizinan Acara</h1>
                    <p className="text-gray-600">Pilih jenis acara yang akan diselenggarakan</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {eventTypes.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link href={`/layanan/acara/${event.id}`} className="group">
                                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <CardHeader className={cn("text-white rounded-t-lg", event.color)}>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
                                            <div className="p-2 rounded-full bg-white/20">
                                                <event.icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <p className="text-gray-600 mb-4">{event.description}</p>
                                        
                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Persyaratan:</h4>
                                            <ul className="space-y-1 text-sm text-gray-600">
                                                {event.requirements.map((req, i) => (
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
                            <span>Ajukan permohonan minimal 14 hari sebelum acara dilaksanakan.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Pastikan semua dokumen persyaratan telah dipersiapkan dalam format PDF.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Status permohonan dapat dicek melalui halaman status permohonan.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Untuk acara dengan peserta lebih dari 500 orang, wajib melampirkan rencana pengamanan.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
