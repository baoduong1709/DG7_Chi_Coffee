import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ComposedChart, Bar } from 'recharts';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import cardChart from '~/api/dashboard/cardChart';

function CardChart() {
    const today = dayjs();
    const [totalBillsTrue, setTotalBillsTrue] = useState([]);
    const [selectedRange, setSelectedRange] = useState('7'); // Mặc định là 7 ngày

    useEffect(() => {
        const fetchChart = async () => {
            try {
                const endDate = today;
                let startDate;

                if (selectedRange === '7') {
                    startDate = today.subtract(7, 'day');
                } else if (selectedRange === '30') {
                    startDate = today.subtract(30, 'day');
                }

                const params = {
                    startDate: startDate.format('YYYY-MM-DDT00:00:00'), // Định dạng ngày bắt đầu thành chuỗi 'YYYY-MM-DD'
                    endDate: endDate.format('YYYY-MM-DDT23:59:59'), // Định dạng ngày kết thúc thành chuỗi 'YYYY-MM-DD'
                    status: true,
                };
                const response = await cardChart.getAll(params);
                const sortedResponse = response.sort((a, b) => new Date(a.time) - new Date(b.time));
                setTotalBillsTrue(sortedResponse);
            } catch (error) {
                console.log(error);
            }
        };
        fetchChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRange]);
    const formatDateTick = (timestamp) => {
        const date = dayjs(timestamp);
        return date.format('DD/MM'); // Định dạng phần ngày theo mong muốn
    };
    const [selectedLabel, setSelectedLabel] = useState('Doanh Thu 7 ngày');
    const handleRangeChange = (range) => {
        setSelectedRange(range);
        // Cập nhật tên mục đang được chọn dựa trên range
        if (range === '7') {
            setSelectedLabel('Doanh thu 7 ngày');
        } else if (range === '30') {
            setSelectedLabel('Doanh thu 30 ngày');
        }
    };

    return (
        <div className="row">
            <div className="col-xl-8 col-lg-7" style={{ width: '850px' }}>
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <div className="dropdown">
                            <button
                                className="btn fs-2 btn-danger dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedLabel}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a
                                        className="dropdown-item text-uppercase"
                                        href="#1"
                                        onClick={() => handleRangeChange('7')}
                                    >
                                        Doanh thu 7 ngày
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item text-uppercase"
                                        href="#1"
                                        onClick={() => handleRangeChange('30')}
                                    >
                                        doanh thu 30 ngày
                                    </a>
                                </li>
                            </ul>
                        </div>
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
                            <ComposedChart
                                width={800}
                                margin={{ top: 0, right: 0, left: 40, bottom: 0 }}
                                height={250}
                                data={totalBillsTrue}
                            >
                                <XAxis dataKey="time" tickFormatter={formatDateTick} />
                                <YAxis tickFormatter={(value) => new Intl.NumberFormat('vi-VN').format(value)} />
                                <Tooltip
                                    labelFormatter={(label) => {
                                        const date = dayjs(label);
                                        return date.format('DD/MM/YYYY');
                                    }}
                                />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Bar
                                    dataKey="cost"
                                    barSize={20}
                                    fill="#de4057"
                                    name="Doanh thu"
                                    formatter={(value) =>
                                        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                            .format(value)
                                            .replace(/₫/g, 'VNĐ')
                                    }
                                />
                            </ComposedChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardChart;
