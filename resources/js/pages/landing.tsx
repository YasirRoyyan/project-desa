import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Footer } from '@/components/footer';
import { FadeInView, StaggerAnimation, StaggerItem, Typewriter } from '@/components/animations';
import { 
    ChevronDown, 
    ChevronRight,
    MapPin,
    Users,
    Building,
    Shield,
    FileText,
    Briefcase,
    Calendar,
    TreePine,
    Star,
    Clock,
    CheckCircle,
    ArrowRight,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Phone,
    Mail,
    MapIcon,
    Target,
    Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Landing() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

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

    const stats = [
        { number: "2,540", label: "Warga Terdaftar", icon: Users },
        { number: "150+", label: "Perizinan Selesai", icon: CheckCircle },
        { number: "98%", label: "Tingkat Kepuasan", icon: Star },
        { number: "24/7", label: "Layanan Online", icon: Clock }
    ];

    const features = [
        {
            title: "Layanan Digital Terintegrasi",
            description: "Semua layanan desa dalam satu platform yang mudah diakses",
            icon: Shield
        },
        {
            title: "Proses Transparan",
            description: "Pantau status permohonan Anda secara real-time",
            icon: FileText
        },
        {
            title: "Dukungan 24/7",
            description: "Tim support siap membantu Anda kapan saja",
            icon: Clock
        }
    ];

    return (
        <>
            <Head title="Desa Drawati - Pelayanan Digital Terdepan">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen">
                {/* Navigation */}
                <motion.nav 
                    className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <motion.div 
                                className="flex items-center space-x-3"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-[#1E4359] to-[#2A5B73] rounded-xl flex items-center justify-center">
                                    <img 
                                        src="/logo-drawati.png" 
                                        alt="Logo Desa Drawati" 
                                        className="w-6 h-6 object-contain"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#1E4359]">Desa Drawati</h2>
                                </div>
                            </motion.div>

                            {/* Navigation Links */}
                            <div className="hidden md:flex items-center space-x-8">
                                <button 
                                    onClick={() => scrollToSection('home')}
                                    className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                                >
                                    Beranda
                                </button>
                                
                                {/* Perizinan Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium flex items-center space-x-1">
                                            <span>Perizinan</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-2">
                                        {services.map((service, index) => (
                                            <DropdownMenuItem key={index} asChild>
                                                <Link 
                                                    href={service.href}
                                                    className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[#1E4359]/5 transition-colors cursor-pointer"
                                                >
                                                    <service.icon className="w-4 h-4 text-[#1E4359]" />
                                                    <span className="text-gray-700">{service.name}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                
                                <button 
                                    onClick={() => scrollToSection('services')}
                                    className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                                >
                                    Layanan
                                </button>
                                <button 
                                    onClick={() => scrollToSection('about')}
                                    className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                                >
                                    Tentang
                                </button>
                                <button 
                                    onClick={() => scrollToSection('contact')}
                                    className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                                >
                                    Kontak
                                </button>
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center space-x-4">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="text-[#1E4359] hover:bg-[#1E4359]/5">
                                        Masuk
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white">
                                        Daftar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.nav>

                {/* Hero Section */}
                <section 
                    id="home"
                    className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E4359]/5 via-white to-[#1E4359]/10 overflow-hidden pt-16"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E4359' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    <div className="mt-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <FadeInView direction="up" delay={0.2}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                </motion.div>
                            </FadeInView>

                            <FadeInView direction="up" delay={0.4}>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                                    <span className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] bg-clip-text text-transparent">
                                        Desa Drawati
                                    </span>
                                    <br />
                                    <Typewriter 
                                        text="Melayani Dengan Hati"
                                        className="text-gray-700"
                                        delay={1000}
                                    />
                                </h1>
                            </FadeInView>

                            <FadeInView direction="up" delay={0.6}>
                                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                                    Platform digital terdepan untuk layanan administrasi desa yang 
                                    <span className="font-semibold text-[#1E4359]"> cepat, mudah, dan terpercaya</span>. 
                                    Wujudkan pelayanan prima untuk masyarakat Desa Drawati.
                                </p>
                            </FadeInView>

                            <StaggerAnimation className="flex flex-col sm:flex-row gap-4 justify-center mb-12" staggerDelay={0.1}>
                                <StaggerItem>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white px-8 py-4 text-lg font-semibold"
                                            onClick={() => scrollToSection('services')}
                                        >
                                            Jelajahi Layanan
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </motion.div>
                                </StaggerItem>
                                <StaggerItem>
                                    <Link href="/register">
                                        <Button 
                                            variant="outline" 
                                            size="lg"
                                            className="border-2 border-[#1E4359] text-[#1E4359] hover:bg-[#1E4359]/5 px-8 py-4 text-lg font-semibold"
                                        >
                                            Daftar Sekarang
                                        </Button>
                                    </Link>
                                </StaggerItem>
                            </StaggerAnimation>

                            {/* Stats */}
                            <StaggerAnimation className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12" staggerDelay={0.1}>
                                {stats.map((stat, index) => (
                                    <StaggerItem key={index}>
                                        <motion.div 
                                            className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
                                            whileHover={{ 
                                                scale: 1.05, 
                                                y: -5,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <stat.icon className="w-8 h-8 text-[#1E4359] mx-auto mb-2" />
                                            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                                {stat.number}
                                            </div>
                                            <div className="text-sm text-gray-600 font-medium">
                                                {stat.label}
                                            </div>
                                        </motion.div>
                                    </StaggerItem>
                                ))}
                            </StaggerAnimation>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div 
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <button 
                            onClick={() => scrollToSection('services')}
                            className="text-gray-400 hover:text-[#1E4359] transition-colors"
                        >
                            <ChevronDown className="w-8 h-8" />
                        </button>
                    </motion.div>
                </section>

                {/* Services Section */}
                <section id="services" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeInView direction="up" className="text-center mb-16">
                            <Badge className="mb-4 bg-[#1E4359]/10 text-[#1E4359] border-[#1E4359]/20">
                                Layanan Unggulan
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Layanan Digital Terlengkap
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Nikmati kemudahan layanan administrasi desa yang modern, cepat, dan dapat diakses kapan saja
                            </p>
                        </FadeInView>

                        <StaggerAnimation className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
                            {services.map((service, index) => (
                                <StaggerItem key={index}>
                                    <motion.div
                                        whileHover={{ 
                                            scale: 1.02, 
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                                            <CardHeader className="pb-4">
                                                <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                                                    <service.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                                                    {service.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-600 mb-4 leading-relaxed">
                                                    {service.description}
                                                </p>
                                                <div className="space-y-2 mb-6">
                                                    {service.features.map((feature, featureIndex) => (
                                                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                                <Link href={service.href}>
                                                    <Button
                                                        className="w-full bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] hover:cursor-pointer"
                                                        size="sm"
                                                    >
                                                        Mulai Sekarang
                                                        <ChevronRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerAnimation>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <FadeInView direction="left">
                                <div>
                                    <Badge className="mb-4 bg-[#1E4359]/10 text-[#1E4359] border-[#1E4359]/20">
                                        Keunggulan Kami
                                    </Badge>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                         Kemudahan Layanan untuk Semua Warga 
                                        <span className="block bg-gradient-to-r from-[#1E4359] to-[#2A5B73] bg-clip-text text-transparent">
                                        Semua Warga 
                                        </span>
                                    </h2>
                                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                        Kami berkomitmen memberikan pelayanan terbaik dengan teknologi modern 
                                        dan pendekatan yang berpusat pada masyarakat.
                                    </p>

                                    <div className="space-y-6">
                                        {features.map((feature, index) => {
                                            const gradients = [
                                                'bg-gradient-to-br from-indigo-500 to-purple-500',
                                                'bg-gradient-to-br from-orange-500 to-pink-500', 
                                                'bg-gradient-to-br from-teal-500 to-emerald-500'
                                            ];
                                            return (
                                                <motion.div 
                                                    key={index}
                                                    className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 transition-all duration-300 border border-transparent hover:border-blue-100"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    viewport={{ once: true }}
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                >
                                                    <div className={`w-14 h-14 ${gradients[index]} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                                        <feature.icon className="w-7 h-7 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                            {feature.title}
                                                        </h3>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </FadeInView>

                            <FadeInView direction="right">
                                <div className="relative">
                                    <motion.div 
                                        className="relative z-10"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img 
                                            src="/latar-onboard.png" 
                                            alt="Desa Drawati" 
                                            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                                    </motion.div>
                                    
                                    {/* Floating Cards */}
                                    <motion.div 
                                        className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">150+ Perizinan</div>
                                                <div className="text-xs text-gray-600">Selesai bulan ini</div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border"
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                                <Star className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">98% Rating</div>
                                                <div className="text-xs text-gray-600">Kepuasan warga</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </FadeInView>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 bg-gradient-to-br from-[#1E4359]/5 to-[#2A5B73]/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeInView direction="up" className="text-center mb-16">
                            <Badge className="mb-4 bg-[#1E4359]/10 text-[#1E4359] border-[#1E4359]/20">
                                Tentang Kami
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                <span className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] bg-clip-text text-transparent">
                                    Desa Drawati
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                                Berlokasi di Kecamatan Passeh, Kabupaten Bandung, Desa Drawati berkomitmen 
                                menjadi desa digital terdepan dalam memberikan pelayanan kepada masyarakat.
                            </p>
                        </FadeInView>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <StaggerAnimation className="lg:col-span-2 space-y-8" staggerDelay={0.2}>
                                <StaggerItem>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-white to-[#1E4359]/5 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                                            <div className="flex items-start space-x-6">
                                                <div className="w-16 h-16 bg-gradient-to-br from-[#1E4359] to-[#2A5B73] rounded-2xl flex items-center justify-center flex-shrink-0">
                                                    <Eye className="w-8 h-8 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                                        <span className="bg-gradient-to-r from-[#1E4359] to-[#2A5B73] bg-clip-text text-transparent">
                                                            Visi Kami
                                                        </span>
                                                    </h3>
                                                    <p className="text-gray-600 text-lg leading-relaxed">
                                                    Mewujudkan masyarakat yang adil dan makmur, sehat dan sejahtera serta bertaqwa kepada Tuhan Yang Maha Esa, berahlak mulia yang berwawasan ilmu pengetahuan dan tekhnologi tinggi dan cinta terhadap lingkungan sekitarnya
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </StaggerItem>

                                <StaggerItem>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-white to-[#2A5B73]/5 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                                            <div className="flex items-start space-x-6">
                                                <div className="w-16 h-16 bg-gradient-to-br from-[#2A5B73] to-[#1E4359] rounded-2xl flex items-center justify-center flex-shrink-0">
                                                    <Target className="w-8 h-8 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                                        <span className="bg-gradient-to-r from-[#2A5B73] to-[#1E4359] bg-clip-text text-transparent">
                                                            Misi Kami
                                                        </span>
                                                    </h3>
                                                    <ol className="text-gray-600 text-lg leading-relaxed list-decimal pl-6">
  <li>Meningkatkan Bidang Pembangunan Infrastruktur.</li>
  <li>Meningkatkan Bidang Kesejahteraan Masyarakat.</li>
  <li>Meningkatkan Bidang Religi atau Keagamaan.</li>
  <li>Meningkatkan Bidang Pemerintahan.</li>
  <li>Meningkatkan Bidang Pendidikan.</li>
  <li>Meningkatkan Bidang Kesehatan.</li>
  <li>Meningkatkan Bidang Ekonomi.</li>
</ol>   
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </StaggerItem>
                            </StaggerAnimation>

                            <FadeInView direction="right">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-[#1E4359] to-[#2A5B73] text-white h-full relative overflow-hidden">
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
                                            }} />
                                        </div>
                                        <div className="text-center relative z-10">
                                            <motion.div 
                                                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <MapIcon className="w-8 h-8 text-white" />
                                            </motion.div>
                                            <h3 className="text-2xl font-bold mb-6">Lokasi Desa</h3>
                                            <div className="space-y-3 text-white/90">
                                                <p className="font-semibold text-lg">Desa Drawati</p>
                                                <p className="text-white/80">Kecamatan Passeh</p>
                                                <p className="text-white/80">Kabupaten Bandung</p>
                                                <p className="text-white/80">Jawa Barat, Indonesia</p>
                                            </div>
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button 
                                                    variant="secondary" 
                                                    className="mt-8 bg-white text-[#1E4359] hover:bg-gray-100 font-semibold px-6 py-3"
                                                >
                                                    Lihat di Maps
                                                    <MapPin className="ml-2 h-4 w-4" />
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </FadeInView>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeInView direction="up" className="text-center mb-16">
                            <Badge className="mb-4 bg-[#1E4359]/10 text-[#1E4359] border-[#1E4359]/20">
                                Hubungi Kami
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Butuh Bantuan?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Tim kami siap membantu Anda dengan segala pertanyaan dan kebutuhan layanan
                            </p>
                        </FadeInView>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <StaggerAnimation className="lg:col-span-2" staggerDelay={0.1}>
                                <StaggerItem>
                                    <Card className="p-8 border-0 shadow-lg">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                                        <div className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Nama Lengkap
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4359] focus:border-transparent"
                                                        placeholder="Masukkan nama lengkap"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Email
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4359] focus:border-transparent"
                                                        placeholder="Masukkan email"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Subjek
                                                </label>
                                                <input 
                                                    type="text" 
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4359] focus:border-transparent"
                                                    placeholder="Subjek pesan"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Pesan
                                                </label>
                                                <textarea 
                                                    rows={5}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4359] focus:border-transparent"
                                                    placeholder="Tulis pesan Anda..."
                                                />
                                            </div>
                                            <Button className="w-full bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] py-3">
                                                Kirim Pesan
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </div>
                                    </Card>
                                </StaggerItem>
                            </StaggerAnimation>

                            <FadeInView direction="right">
                                <div className="space-y-6">
                                    <Card className="p-6 border-0 shadow-lg">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-[#1E4359] rounded-xl flex items-center justify-center">
                                                <Phone className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Telepon</h4>
                                                <p className="text-gray-600">+62 123 456 789</p>
                                                <p className="text-sm text-gray-500">Senin - Jumat, 08:00 - 16:00</p>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6 border-0 shadow-lg">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-[#2A5B73] rounded-xl flex items-center justify-center">
                                                <Mail className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                                                <p className="text-gray-600">info@desadrawati.id</p>
                                                <p className="text-sm text-gray-500">Respon dalam 24 jam</p>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-6 border-0 shadow-lg">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-[#1E4359] rounded-xl flex items-center justify-center">
                                                <MapPin className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Alamat</h4>
                                                <p className="text-gray-600">Desa Drawati, Kec. Passeh</p>
                                                <p className="text-gray-600">Kab. Bandung, Jawa Barat</p>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Social Media */}
                                    <Card className="p-6 border-0 shadow-lg">
                                        <h4 className="font-semibold text-gray-900 mb-4">Ikuti Kami</h4>
                                        <div className="flex space-x-3">
                                            <motion.a 
                                                href="#" 
                                                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Facebook className="w-5 h-5" />
                                            </motion.a>
                                            <motion.a 
                                                href="#" 
                                                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Instagram className="w-5 h-5" />
                                            </motion.a>
                                            <motion.a 
                                                href="#" 
                                                className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </motion.a>
                                            <motion.a 
                                                href="#" 
                                                className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Youtube className="w-5 h-5" />
                                            </motion.a>
                                        </div>
                                    </Card>
                                </div>
                            </FadeInView>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-[#1E4359] to-[#2A5B73]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <FadeInView direction="up">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Mulai Sekarang
                            </h2>
                            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                                Bergabunglah dengan masyarakat Desa Drawati dan nikmati kemudahan layanan digital kami
                            </p>
                            <StaggerAnimation className="flex flex-col sm:flex-row gap-4 justify-center" staggerDelay={0.1}>
                                <StaggerItem>
                                    <Link href="/register">
                                        <Button 
                                            size="lg" 
                                            className="bg-white text-[#1E4359] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                                        >
                                            Daftar Gratis
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                </StaggerItem>
                                <StaggerItem>
                                    <Button 
                                        variant="outline" 
                                        size="lg"
                                        className="border-2 border-white text-white hover:bg-white hover:text-[#1E4359] px-8 py-4 text-lg font-semibold"
                                        onClick={() => scrollToSection('services')}
                                    >
                                        Pelajari Lebih Lanjut
                                    </Button>
                                </StaggerItem>
                            </StaggerAnimation>
                        </FadeInView>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
