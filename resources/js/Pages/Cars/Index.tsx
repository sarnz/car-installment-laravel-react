import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm  } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
}

export default function Index({ auth, cars }: PageProps<{ cars: Car[] }>) {
    
    const { delete: destroy } = useForm();


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    จัดการรถ
                </h2>
            }
        >
            <Head title="จัดการรถ" />


            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow rounded">
            <Link
                href={route('cars.create')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                เพิ่มรถ
            </Link>



<table className="mt-6 w-full border border-gray-200 rounded-lg overflow-hidden">
    <thead className="bg-gray-100">
        <tr>
            <th className="px-4 py-3 text-left">ยี่ห้อ</th>
            <th className="px-4 py-3 text-left">รุ่น</th>
            <th className="px-4 py-3 text-center">ปี</th>
            <th className="px-4 py-3 text-right">ราคา</th>
            <th className="px-4 py-3 text-center">จัดการ</th>
        </tr>
    </thead>

    <tbody>
        {cars.map(car => (
            <tr
                key={car.id}
                className="border-t hover:bg-gray-50 transition"
            >
                <td className="px-4 py-3">{car.brand}</td>
                <td className="px-4 py-3">{car.model}</td>
                <td className="px-4 py-3 text-center">{car.year}</td>
                <td className="px-4 py-3 text-right">
                    {Number(car.price).toLocaleString()}
                </td>

                <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                        {/* Edit */}
                        <Link
                            href={route('cars.edit', car.id)}
                            className="text-blue-600 hover:underline"
                        >
                            แก้ไข
                        </Link>

                        {/* Delete */}
                        <button
                            onClick={() => {
                                if (
                                    confirm(
                                        'คุณต้องการลบข้อมูลรถคันนี้ใช่หรือไม่?'
                                    )
                                ) {
                                    destroy(
                                        route('cars.destroy', car.id)
                                    );
                                }
                            }}
                            className="text-red-600 hover:underline"
                        >
                            ลบ
                        </button>
                    </div>
                </td>
            </tr>
        ))}

        {cars.length === 0 && (
            <tr>
                <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                >
                    ไม่มีข้อมูลรถ
                </td>
            </tr>
        )}
    </tbody>
</table>

            </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
