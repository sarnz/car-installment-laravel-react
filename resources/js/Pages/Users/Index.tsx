import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
}

export default function Index({ auth, users }: PageProps<{ users: User[] }>) {
    const { post, delete: destroy } = useForm();

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="จัดการผู้ใช้งาน" />


     <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow rounded">
            <table className="w-full mt-6 border rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">ชื่อ</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">สิทธิ์</th>
                        <th className="p-2">สถานะ</th>
                        <th className="p-2">จัดการ</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-t">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">
                                {user.is_active ? (
                                    <span className="text-green-600">
                                        ใช้งาน
                                    </span>
                                ) : (
                                    <span className="text-red-600">
                                        ถูกปิด
                                    </span>
                                )}
                            </td>
                            <td className="p-2 space-x-2">
                                {/* Reset */}
                                <button
                                    onClick={() =>
                                        confirm('รีเซ็ตรหัสผ่านผู้ใช้นี้?') &&
                                        post(
                                            route(
                                                'users.reset',
                                                user.id
                                            )
                                        )
                                    }
                                    className="text-blue-600"
                                >
                                    Reset
                                </button>

                                {/* Toggle */}
                                <button
                                    onClick={() =>
                                        post(
                                            route(
                                                'users.toggle',
                                                user.id
                                            )
                                        )
                                    }
                                    className="text-yellow-600"
                                >
                                    {user.is_active
                                        ? 'ปิดใช้งาน'
                                        : 'เปิดใช้งาน'}
                                </button>

                                {/* Delete */}
                                <button
                                    onClick={() =>
                                        confirm('ลบผู้ใช้นี้?') &&
                                        destroy(
                                            route(
                                                'users.destroy',
                                                user.id
                                            )
                                        )
                                    }
                                    className="text-red-600"
                                >
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
