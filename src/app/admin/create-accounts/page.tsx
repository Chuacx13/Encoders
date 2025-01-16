'use client';

import { useState } from 'react';
import { addAdmin, addResident } from '@/app/api';
import { Admin, Resident } from '@/app/interfaces';

const CreateAccountForm = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('resident'); 
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Template fopr temporary password
            const password = email.split('@')[0] + phoneNumber.slice(-4);

            const response = await fetch('/api/createAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    phoneNumber,
                    password,
                    role, 
                }),
            });

            if (!response.ok) {
                console.error('Failed to create new accounts.')
                throw new Error('Failed to create new accounts.');
            }

            const data = await response.json();
            if (role === 'admin') {
                // Create admin user
                const adminUser: Admin = { id: data.uid, email, name, phoneNumber, role };
                await addAdmin(adminUser);
              } else if (role === 'resident') {
                // Create resident user
                const residentUser: Resident = { id: data.uid, email, name, phoneNumber, role, purchasedItems: [], voucher: [], voucherPoints: 0 };
                await addResident(residentUser);
              }

            setMessage('Account created successfully.')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center mt-32 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                {message && <p className="text-green-500 text-center text-sm">{message}</p>}
                <form onSubmit={handleCreateAccount} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-1 p-3 border rounded-lg focus:outline-none"
                            placeholder='Enter an email'
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="w-full mt-1 p-3 border rounded-lg focus:outline-none"
                            placeholder='Eg.+65XXXXXXXX'
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full mt-1 p-3 border rounded-lg focus:outline-none"
                            placeholder='Enter a name'
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-lg focus:outline-none"
                        >
                            <option value="Resident">Resident</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccountForm;
