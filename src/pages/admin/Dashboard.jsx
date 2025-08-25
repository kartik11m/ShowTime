import { ChartLineIcon, CircleDollarSignIcon, icons, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormat';

const Dashboard = () => {

    const currency = import.meta.env.VITE_CURRENCY;

    const [dashboardData , setDashboardData] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeShows: [],
        totalUser: 0,
    })
    const [loading , setLoading] = useState(true);

    const dashboardCards = [
        {title: "Total Bookings" , value: dashboardData.totalBookings || "0" , icon: ChartLineIcon},
        {title: "Total Revenue" , value: dashboardData.totalRevenue || "0" , icon: CircleDollarSignIcon},
        {title: "Active Shows" , value: dashboardData.activeShows.length || "0" , icon: PlayCircleIcon},
        {title: "Total Users" , value: dashboardData.totalUser || "0" , icon: UserIcon}
    ]

    const fetchDashboardData = async () =>{
        setDashboardData(dummyDashboardData);
        setLoading(false);
    }

    useEffect(()=>{
        fetchDashboardData();
    },[]);

  return !loading ? (
    <>
    <div>
            <Title text1="Admin" text2="Dashboard" />
        <div className="relative flex flex-wrap mt-6 gap-4">
            <BlurCircle top='-100px' left='0'/>
            <div className="flex flex-wrap w-full gap-4">
                {dashboardCards.map((card, index) => (
                    <div key={index} className="bg-primary/10 border border-primary/20 
                    rounded-md px-4 py-3 flex items-center max-w-50 w-full gap-4">
                    <card.icon className="w-8 h-8 text-primary" />
                    <div>
                        <p className="text-sm text-gray-400">{card.title}</p>
                        <p className="text-lg font-semibold">{currency} {card.value}</p>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    </div>

      <p className="mt-10 text-lg font-medium">Active Shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top='100px' left='-10%'/>
        {dashboardData.activeShows.map((show)=>(
            <div key={show._id} className="w-55 rounded-lg overflow-hidden
            hover:-translate-y-1 transition duration-300">
                <img src={show.movie.poster_path} alt="" className='h-60 w-full object-cover'/>
                <p className="font-medium p-2 truncate">{show.movie.title}</p>
                <div className="flex items-center justify-between px-2">
                    <p className="text-lg font-medium">{currency}{show.showPrice}</p>
                    <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                        <StarIcon className='w-4 h-4 text-primary fill-primary'/>
                        {show.movie.vote_average.toFixed(1)}
                    </p>
                </div>
                <p className="px-2 pt-2 text-sm text-gray-500">{dateFormat(show.showDateTime)}</p>
            </div>
        ))}
      </div>

  </>

  ) : <Loading/>
}

export default Dashboard