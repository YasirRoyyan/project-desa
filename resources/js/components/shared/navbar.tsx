import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
    Menu,
    X,
    ChevronDown,
    FileText,
    Building,
    Calendar,
    Briefcase,
    TreePine,
} from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

const perizinanServices = [
    { name: "Perizinan Pribadi", href: "/form-pribadi", icon: FileText },
    { name: "Perizinan Bangunan", href: "/form-bangunan", icon: Building },
    { name: "Perizinan Acara", href: "/form-acara", icon: Calendar },
    { name: "Perizinan Usaha", href: "/form-usaha", icon: Briefcase },
    { name: "Perizinan Pertanian", href: "/form-pertanian", icon: TreePine },
];

export function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
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
                        <Link href="/">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#1E4359] to-[#2A5B73] rounded-xl flex items-center justify-center">
                                <img 
                                    src="/logo-drawati.png" 
                                    alt="Logo Desa Drawati" 
                                    className="w-6 h-6 object-contain"
                                />
                            </div>
                        </Link>
                        <div>
                            <h2 className="text-lg font-bold text-[#1E4359]">Desa Drawati</h2>
                        </div>
                    </motion.div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/"
                            className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                        >
                            Beranda
                        </Link>
                        
                        {/* Perizinan Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium flex items-center space-x-1">
                                    <span>Perizinan</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-2">
                                {perizinanServices.map((service, index) => (
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
                        
                        <Link 
                            href="/layanan"
                            className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                        >
                            Layanan
                        </Link>
                        <Link 
                            href="/tentang"
                            className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                        >
                            Tentang
                        </Link>
                        <Link 
                            href="/kontak"
                            className="text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                        >
                            Kontak
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#1E4359] to-[#2A5B73] rounded-full flex items-center justify-center text-white">
                                            {user.name.charAt(0)}
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profil" className="flex items-center space-x-2">
                                            <span>Profil</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/pengaturan" className="flex items-center space-x-2">
                                            <span>Pengaturan</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link 
                                            href="/logout" 
                                            method="post" 
                                            as="button"
                                            className="flex items-center space-x-2 w-full text-red-600"
                                        >
                                            <span>Keluar</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
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
                            </>
                        )}
                        
                        <button
                            type="button"
                            className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div 
                className="fixed inset-0 z-50 md:hidden"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ 
                    opacity: mobileMenuOpen ? 1 : 0,
                    x: mobileMenuOpen ? 0 : "100%"
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
                
                {/* Mobile menu content */}
                <motion.div 
                    className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl"
                    initial={{ x: "100%" }}
                    animate={{ x: mobileMenuOpen ? 0 : "100%" }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#1E4359] to-[#2A5B73] rounded-xl flex items-center justify-center">
                                <img 
                                    src="/logo-drawati.png" 
                                    alt="Logo Desa Drawati" 
                                    className="w-6 h-6 object-contain"
                                />
                            </div>
                            <h2 className="text-lg font-bold text-[#1E4359]">Desa Drawati</h2>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="px-4 py-6 space-y-6">
                        <Link 
                            href="/"
                            className="block text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Beranda
                        </Link>
                        {perizinanServices.map((service, index) => (
                            <Link
                                key={index}
                                href={service.href}
                                className="flex items-center space-x-3 text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <service.icon className="w-5 h-5" />
                                <span>{service.name}</span>
                            </Link>
                        ))}
                        <Link 
                            href="/layanan"
                            className="block text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Layanan
                        </Link>
                        <Link 
                            href="/tentang"
                            className="block text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Tentang
                        </Link>
                        <Link 
                            href="/kontak"
                            className="block text-gray-700 hover:text-[#1E4359] transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Kontak
                        </Link>
                    </div>
                    {!isAuthenticated && (
                        <div className="px-4 py-6 border-t space-y-4">
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button 
                                    variant="ghost" 
                                    className="w-full justify-center text-[#1E4359] hover:bg-[#1E4359]/5"
                                >
                                    Masuk
                                </Button>
                            </Link>
                            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                <Button 
                                    className="w-full justify-center bg-gradient-to-r from-[#1E4359] to-[#2A5B73] hover:from-[#2A5B73] hover:to-[#1E4359] text-white"
                                >
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </motion.nav>
    );
}
