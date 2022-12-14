import { useState } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";

import { prisma } from "../lib/prisma";
import UserForm from "../components/UserForm/UserForm";
import axios from "axios";

type UserDataType = {
  users: {
    email: String,
    name: String,
    id: number
  }[]
}

export type FormData = {
  email: string
  name: string
  id?: Number
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true
    }
  });
  return {
    props: {
      users
    }
  }
}

export const refreshData = () => {
  Router.replace(Router.asPath)
}

export const create = async (data: FormData) => {
  try {
    // fetch('http://localhost:3000/api/create', {
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   method: 'POST'
    // }).then(() => {
    //   if (data?.id) {
    //     deleteUser(data?.id)
    //     refreshData();
    //   } else {
    //     refreshData();
    //   }
    // })



    axios.post('http://localhost:3000/api/create', data).then(() => {
      if (data?.id) {
        deleteUser(data?.id)
        refreshData();
      } else {
        refreshData();
      }
    })
  } catch (err) {
    console.log(err);
  }
}

export const deleteUser = async (id: Number) => {
  try {
    fetch(`http://localhost:3000/api/user/${id}`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'DELETE'
    }).then(() => refreshData())
  } catch (error) {
    console.log(error);
  }
}


export const editUser = async (data: FormData) => {
  try {
    fetch(`http://localhost:3000/api/update/${data.id}`, {
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      },
      method: 'PUT'
    }).then(() => refreshData())
  } catch (error) {
    console.log(error);
  }
}


export default function Home({ users }: UserDataType) {
  const [formData, setformData] = useState<FormData | any>({
    email: '',
    name: '',
  });

  return (
    <div>
      <UserForm refreshData={refreshData} formData={formData} setformData={setformData} />
      <div className="text-lg font-bold w-1/2 m-auto text-center my-5">TO DO</div>
      <div className="flex align-baseline flex-wrap justify-between w-1/3 m-auto my-5">
        {
          users?.map((data, ind) => <div className="w-1/2  mb-2 rounded overflow-hidden shadow-lg" key={ind}>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2"><b>EMAIL : </b>{data?.email}</div>
              <p className="text-gray-700 text-base">
                <b>NAME : </b>{data?.name}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span onClick={() => deleteUser(data.id)} className="inline-block bg-red-200 hover:bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:text-red-50 mr-2 mb-2 cursor-pointer">DELETE</span>
              <span onClick={() => setformData(data)} className="inline-block bg-gray-200 hover:bg-gray-500   rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:text-gray-50 mr-2 mb-2 cursor-pointer">EDIT</span>
            </div>
          </div>
          )
        }
      </div>
    </div >
  )
}
