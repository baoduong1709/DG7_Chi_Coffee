import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ComposedChart, Area, Bar } from 'recharts';

import '~/assets/css/dashboardAdmin.css';

export default function AdminDashBoard() {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const [datebase, setDatabase] = useState([]);
    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/albums')
            .then((response) => {
                setDatabase(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <section className="py-5 my-5">
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-uppercase fs-1">Quản lý</h1>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                            tổng đơn đặt hàng
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">10</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                            Tổng tiền
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">215,000</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-8 col-lg-7" style={{ width: '800px' }}>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                            </div>
                            <div className="card-body">
                                <div className="chart-area">
                                    <div className="chartjs-size-monitor">
                                        <div className="chartjs-size-monitor-expand">
                                            <div className=""></div>
                                        </div>
                                        <div className="chartjs-size-monitor-shrink">
                                            <div className=""></div>
                                        </div>
                                    </div>
                                    <LineChart
                                        width={730}
                                        height={250}
                                        data={datebase}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="userId" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="id" stroke="#82ca9d" />
                                    </LineChart>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-7" style={{ width: '800px' }}>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                            </div>

                            <div className="card-body">
                                <div className="chart-area">
                                    <div className="chartjs-size-monitor">
                                        <div className="chartjs-size-monitor-expand">
                                            <div className=""></div>
                                        </div>
                                        <div className="chartjs-size-monitor-shrink">
                                            <div className=""></div>
                                        </div>
                                    </div>
                                    <ComposedChart width={730} height={250} data={data}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                                        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                                    </ComposedChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
