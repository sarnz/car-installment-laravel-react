import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { FormEvent } from 'react';

interface CarForm {
    brand: string;
    model: string;
    year: string;
    price: string;
}

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } =
        useForm<CarForm>({
            brand: '',
            model: '',
            year: '',
            price: '',
        });

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        post(route('cars.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    เพิ่มรถเข้าคลัง
                </h2>
            }
        >
            <Head title="เพิ่มรถ" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow rounded">

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Brand */}
                            <div>
                                <label className="block mb-1">ยี่ห้อ</label>
                                <input
                                    type="text"
                                    value={data.brand}
                                    onChange={e =>
                                        setData('brand', e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.brand && (
                                    <p className="text-red-500 text-sm">
                                        {errors.brand}
                                    </p>
                                )}
                            </div>

                            {/* Model */}
                            <div>
                                <label className="block mb-1">รุ่น</label>
                                <input
                                    type="text"
                                    value={data.model}
                                    onChange={e =>
                                        setData('model', e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.model && (
                                    <p className="text-red-500 text-sm">
                                        {errors.model}
                                    </p>
                                )}
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block mb-1">ปี</label>
                                <input
                                    type="number"
                                    value={data.year}
                                    onChange={e =>
                                        setData('year', e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.year && (
                                    <p className="text-red-500 text-sm">
                                        {errors.year}
                                    </p>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block mb-1">ราคา</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={e =>
                                        setData('price', e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-sm">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                                >
                                    บันทึก
                                </button>

                                <Link
                                    href={route('cars.index')}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    ยกเลิก
                                </Link>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
