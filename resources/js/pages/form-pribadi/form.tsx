import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState, useEffect, ElementType } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { cn } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import { FileText, Home, Plane, User, FileCheck, ArrowLeft } from 'lucide-react';

const icons = [FileText, Home, User, Plane, FileCheck];
const colors = [
  'bg-gradient-to-br from-blue-500 to-purple-500',    
  'bg-gradient-to-br from-orange-500 to-red-500',     
  'bg-gradient-to-br from-pink-500 to-rose-500',      
  'bg-gradient-to-br from-emerald-500 to-teal-500',   
  'bg-gradient-to-br from-cyan-500 to-blue-500',      
];

interface InputField {
  name: string;
  value: string;
  required: boolean;
  label?: string;
  placeholder?: string;
  type?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  options?: string[];
  disabled?: boolean;
  readOnly?: boolean;
  inputMode?: string;
}

interface Syarat {
  id: number | string;
  nama: string;
}

interface FormatSurat {
  id: number;
  nama: string;
  url_surat: string;
  deskripsi: string;
  form: InputField[];
  syarat: Syarat[];
}

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

interface BusinessPermitFormProps {
  slug: string;
}

export default function BusinessPermitForm({ slug }: BusinessPermitFormProps) {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  
  const [formatSurat, setFormatSurat] = useState<FormatSurat | null>(null);
  const [Icon, setIcon] = useState<ElementType>(icons[0]);
  
  const fetchFormatSurat = async () => {
    try {
      const response = await axios.get(`${API_URL}/format-surat/form/${slug}`);
      setFormatSurat(response.data);
      setIcon(icons[(response.data.id - 2) % icons.length]);
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast.error('Kesalahan Sistem', 'Gagal mengambil format surat');
    }
  }
  
  useEffect(() => {
    fetchFormatSurat();
  }, []);
  
  const [data, setData] = useState<{ [key: string]: any }>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setData(prev => ({
      ...prev,
      form: {
          ...prev.form,
          [name]: value,
        }
      }));
    };
    
    const handleSelectChange = (name: string, value: string) => {
      setData(prev => ({
        ...prev,
        form: {
          ...prev.form,
          [name]: value,
        }
      }));
    };

    const handleFileChange = (id: number | string, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      
      setData((prev) => ({
        ...prev,
        file: {
          ...prev.file,
          [id]: file,
        },
      }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        const formData = new FormData();
        const token = localStorage.getItem("token"); // or wherever you store it
  
        // Add form fields
        Object.entries(data.form).forEach(([key, value]) => {
          formData.append(`form[${key}]`, value as string);
        });
  
        // Add files
        Object.entries(data.file).forEach(([key, file]) => {
          if (file) {
            formData.append(`syarat[${key}]`, file as Blob);
          }
        });
  
        const response = await axios.post(`${API_URL}/surat/${slug}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Success handling here
        console.log("Submitted:", response.data);
      } catch (error) {
        // Error handling here
        console.error("Submission failed:", error);
        showToast.error('Kesalahan Sistem', 'Gagal mengirim data');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="px-0 py-2 -ml-2 hover:bg-transparent hover:underline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
          </Button>
        </div>
        
        {/* Header Section */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className={cn(
              "w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-md",
              colors[(formatSurat?.id || 0) % colors.length - 1] || 'bg-gradient-to-br from-gray-500 to-gray-700'
            )}>
              <Icon className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                Ajukan {formatSurat?.nama || 'Perizinan Usaha'}
              </h1>
              <p className="text-gray-600 max-w-2xl">
                {formatSurat?.deskripsi || 'Silakan lengkapi formulir di bawah ini dengan data yang valid dan lengkap untuk proses pengajuan perizinan.'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <Card className="overflow-hidden border border-gray-100 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold">Formulir Permohonan</CardTitle>
              <p className="text-blue-100 text-sm opacity-90">
                Mohon isi data dengan lengkap dan benar. Pastikan semua dokumen yang diunggah jelas dan valid.
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-8">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formatSurat?.form?.map((field, index) => {
                    return (
                      <div key={field.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                            {field.label}
                          </Label>
                          {field.required && (
                            <span className="text-xs text-red-500">Wajib diisi</span>
                          )}
                        </div>
                        {field.type === 'select' && field.options ? (
                          <Select
                            value={data.form?.[field.name] || ''}
                            onValueChange={(value) => handleSelectChange(field.name, value)}
                            disabled={isSubmitting}
                            required={field.required}
                          >
                            <SelectTrigger 
                              className={cn(
                                'w-full h-11',
                                // error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                              )}
                            >
                              <SelectValue placeholder={`Pilih ${field?.label || ''}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options.map((option) => (
                                <SelectItem 
                                  key={option} 
                                  value={option}
                                  className="text-gray-700"
                                >
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : field.type === 'textarea' ? (
                          <Textarea
                            id={field.name}
                            name={field.name}
                            value={data.form?.[field.name] || ''}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder={field.placeholder}
                            required={field.required}
                            className={cn(
                              'min-h-[120px] text-sm',
                              // error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                            )}
                          />
                        ) : (
                          <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={data.form?.[field.name] || ''}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder={field.placeholder}
                            required={field.required}
                            className={cn(
                              'h-11',
                              // error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                            )}
                          />
                        )}
                        
                        {/* {error && (
                          <p className="text-sm text-red-600 mt-1">{error}</p>
                        )} */}
                      </div>
                    );
                  })}
                </div>
                
                {/* File Upload Section */}
                <div className="border-t border-gray-200 pt-6 md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Berkas Pendukung</h3>
                  <div className="space-y-4">
                      {
                        formatSurat?.syarat?.map((row, index) => {
                          return (
                            <div className="space-y-2">
                              <div key={index} className='flex items-center justify-between'>
                                <Label htmlFor="file" className="text-sm font-medium text-gray-700">
                                  {row.nama}
                                </Label>
                                <span className="text-xs text-red-500">Wajib diisi</span>
                              </div>
                              <Input
                                id="file"
                                name="file"
                                type="file"
                                onChange={e => handleFileChange(row.id, e)}
                                disabled={isSubmitting}
                                accept=".pdf,.doc,.docx,image/*"
                                required
                                className={cn(
                                  'border-dashed border-2',
                                  // errors.file ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                )}
                              />
                              {/* {errors.file && (
                                <p className="text-sm text-red-600 mt-1">{errors.file}</p>
                              )} */}
                              <p className="text-xs text-gray-500 mt-1">
                                Format file: PDF, DOC, DOCX, JPG, PNG (Maks. 5MB)
                              </p>
                            </div>
                          );
                        })
                      }
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Tanggal Pengajuan
                      </Label>
                      <Input
                        type="text"
                        value={getCurrentDate()}
                        readOnly
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Footer */}
              <div className="pt-6 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Informasi Penting</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          Pastikan data yang Anda masukkan sudah benar dan lengkap. Dokumen yang diunggah harus jelas dan dapat dibaca.
                          Pengajuan yang sudah dikirim tidak dapat dibatalkan atau diubah.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-sm text-gray-600">
                    Dengan mengirimkan formulir ini, saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan.
                  </p>
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto px-8 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </div>
                    ) : 'Ajukan Sekarang'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}