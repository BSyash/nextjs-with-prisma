import React from 'react'
import { create, editUser } from '../../pages'


const UserForm = ({ refreshData, formData, setformData }: any) => {

    return (
        <div className="w-full max-w-xs m-auto my-3 fixed right-5 top-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={e => {
                e.preventDefault();
                if (formData?.id) {
                    try {
                        editUser(formData).then((res: any) => {
                            if (res) {
                                setformData({
                                    email: '',
                                    name: ''
                                });
                                refreshData();
                            } else {
                                setformData({
                                    email: '',
                                    name: ''
                                });
                                refreshData();
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    try {
                        create(formData).then((res: any) => {
                            if (res) {
                                setformData({
                                    email: '',
                                    name: ''
                                });
                                refreshData();
                            } else {
                                setformData({
                                    email: '',
                                    name: ''
                                });
                                refreshData();
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
            }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter Your Email" value={formData?.email} onChange={(e) => setformData({ ...formData, email: e.target.value })} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter Your Name" value={formData?.name} onChange={(e) => setformData({ ...formData, name: e.target.value })} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        ADD
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserForm