import { 
    MapPin,
    Building,
    FileText,
    Briefcase,
    Calendar,
    TreePine,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Phone,
    Mail,
} from 'lucide-react';

export function Footer() {
    const services = [
    {
        name: "Perizinan Pribadi",
        href: "/form-pribadi",
        icon: FileText,
        title: "Perizinan Pribadi",
        description: "Layanan perizinan untuk keperluan pribadi seperti KTP, KK, dan dokumen lainnya",
        color: "bg-gradient-to-br from-blue-500 to-purple-500",
        features: ["Proses Cepat", "Online 24/7", "Gratis Konsultasi"]
    },
    {
        name: "Perizinan Bangunan",
        href: "/form-bangunan",
        icon: Building,
        title: "Perizinan Bangunan",
        description: "Izin mendirikan bangunan (IMB) dan dokumen konstruksi lainnya",
        color: "bg-gradient-to-br from-orange-500 to-red-500",
        features: ["Survey Lokasi", "Konsultasi Teknis", "Proses Transparan"]
    },
    {
        name: "Perizinan Acara",
        href: "/form-acara",
        icon: Calendar,
        title: "Perizinan Acara",
        description: "Perizinan untuk kegiatan, acara, dan event di wilayah desa",
        color: "bg-gradient-to-br from-pink-500 to-rose-500",
        features: ["Koordinasi Lengkap", "Dukungan Teknis", "Fleksibel"]
    },
    {
        name: "Perizinan Usaha",
        href: "/form-usaha",
        icon: Briefcase,
        title: "Perizinan Usaha",
        description: "SIUP, TDP, dan perizinan usaha untuk mengembangkan bisnis Anda",
        color: "bg-gradient-to-br from-emerald-500 to-teal-500",
        features: ["Bimbingan Usaha", "Networking", "Monitoring"]
    },
    {
        name: "Perizinan Pertanian",
        href: "/form-pertanian",
        icon: TreePine,
        title: "Perizinan Pertanian",
        description: "Izin usaha pertanian, peternakan, dan agribisnis",
        color: "bg-gradient-to-br from-cyan-500 to-blue-500",
        features: ["Konsultasi Ahli", "Subsidi Program", "Pelatihan"]
    }
    ];

    return (
        <footer className="bg-white text-gray-900">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                    {/* Logo and Description */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <img 
                                    src="/logo-drawati.png" 
                                    alt="Logo Desa Drawati" 
                                    className="w-8 h-8 object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Desa Drawati</h3>
                                <p className="text-gray-600">Kecamatan Passeh, Kabupaten Bandung</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-8 max-w-md leading-relaxed">
                            Desa Drawati berkomitmen untuk memberikan pelayanan terbaik kepada masyarakat 
                            melalui teknologi digital yang mudah diakses, transparan, dan efisien.
                        </p>
                        
                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a 
                                href="#" 
                                className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gray-900">Layanan Digital</h4>
                        <ul className="space-y-3">
                            {
                                services.map((service) => (
                                    <li>
                                        <a href={service.href} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center group">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-gray-900 transition-colors"></span>
                                            {service.name}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gray-900">Kontak Kami</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-gray-600 text-sm">
                                    <p>Desa Drawati</p>
                                    <p>Kec. Passeh, Kab. Bandung</p>
                                    <p>Jawa Barat, Indonesia</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <a href="mailto:desadrawati@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                    desadrawati@gmail.com
                                </a>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-4 h-4 text-white" />
                                </div>
                                <a href="tel:+628211635860" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                    +62 821-1635-8060
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Desa Drawati. Semua hak cipta dilindungi.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                                Kebijakan Privasi
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                                Syarat & Ketentuan
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
