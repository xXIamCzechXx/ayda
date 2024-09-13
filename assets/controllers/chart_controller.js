import { Controller } from '@hotwired/stimulus';

/*
 * Charts Controller
 * Visualization of charts printed on pages
 */
export default class extends Controller
{
    /**
     * Default charts inicialization
     */
    connect(){
        let ctx = document.getElementById("chart-bars");
        if (ctx) {
            new Chart(ctx.getContext("2d"), {
                type: "bar",
                data: {
                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                    datasets: [{
                        label: "Sales",
                        tension: 0.4,
                        borderWidth: 0,
                        borderRadius: 4,
                        borderSkipped: false,
                        backgroundColor: "rgba(255, 255, 255, .8)",
                        data: [50, 20, 10, 22, 50, 10, 40],
                        maxBarThickness: 6
                    }, ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: 'rgba(255, 255, 255, .2)'
                            },
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 500,
                                beginAtZero: true,
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                                color: "#fff"
                            },
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: 'rgba(255, 255, 255, .2)'
                            },
                            ticks: {
                                display: true,
                                color: '#f8f9fa',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });
        }

        let ctx2default = document.getElementById("chart-line");
        if (ctx2default) {
            new Chart(ctx2default.getContext("2d"), {
                type: "line",
                data: {
                    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: "Mobile apps",
                        tension: 0,
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(255, 255, 255, .8)",
                        pointBorderColor: "transparent",
                        borderColor: "rgba(255, 255, 255, .8)",
                        borderWidth: 4,
                        backgroundColor: "transparent",
                        fill: true,
                        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
                        maxBarThickness: 6

                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: 'rgba(255, 255, 255, .2)'
                            },
                            ticks: {
                                display: true,
                                color: '#f8f9fa',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                                borderDash: [5, 5]
                            },
                            ticks: {
                                display: true,
                                color: '#f8f9fa',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });
        }

        let ctx3Default = document.getElementById("chart-line-tasks");
        if (ctx3Default) {
            new Chart(ctx3Default.getContext("2d"), {
                type: "line",
                data: {
                    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: "Mobile apps",
                        tension: 0,
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(255, 255, 255, .8)",
                        pointBorderColor: "transparent",
                        borderColor: "rgba(255, 255, 255, .8)",
                        borderWidth: 4,
                        backgroundColor: "transparent",
                        fill: true,
                        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                        maxBarThickness: 6

                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: 'rgba(255, 255, 255, .2)'
                            },
                            ticks: {
                                display: true,
                                padding: 10,
                                color: '#f8f9fa',
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                                borderDash: [5, 5]
                            },
                            ticks: {
                                display: true,
                                color: '#f8f9fa',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });
        }

        // Line chart
        let ctx1 = document.getElementById("line-chart");
        if (ctx1) {
            new Chart(ctx1.getContext("2d"), {
                type: "line",
                data: {
                    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            label: "Organic Search",
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 2,
                            pointBackgroundColor: "#e91e63",
                            borderColor: "#e91e63",
                            backgroundColor: "transparent",
                            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                            maxBarThickness: 6
                        },
                        {
                            label: "Referral",
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 2,
                            pointBackgroundColor: "#3A416F",
                            borderColor: "#3A416F",
                            backgroundColor: "transparent",
                            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                            maxBarThickness: 6
                        },
                        {
                            label: "Direct",
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 2,
                            pointBackgroundColor: "#03A9F4",
                            borderColor: "#03A9F4",
                            backgroundColor: "transparent",
                            data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
                            maxBarThickness: 6
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                padding: 10,
                                color: '#b2b9bf',
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: true,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                color: '#b2b9bf',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });
        }

        // Line chart with gradient
        let ctx2 = document.getElementById("line-chart-gradient");
        if (ctx2) {
            new Chart(ctx2.getContext("2d"), {
                type: "line",
                data: {
                    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            label: "Mobile apps",
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 0,
                            borderColor: "#e91e63",
                            backgroundColor: "transparent",
                            fill: true,
                            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                            maxBarThickness: 6

                        },
                        {
                            label: "Websites",
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 0,
                            borderColor: "#3A416F",
                            backgroundColor: "transparent",
                            fill: true,
                            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                            maxBarThickness: 6
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                padding: 10,
                                color: '#b2b9bf',
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                color: '#b2b9bf',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });
        }

        // Doughnut chart
        let ctx3 = document.getElementById("doughnut-chart");
        if (ctx3) {
            new Chart(ctx3.getContext("2d"), {
                type: "doughnut",
                data: {
                    labels: ['Creative Tim', 'Github', 'Bootsnipp', 'Dev.to', 'Codeinwp'],
                    datasets: [{
                        label: "Projects",
                        weight: 9,
                        cutout: 60,
                        tension: 0.9,
                        pointRadius: 2,
                        borderWidth: 2,
                        backgroundColor: ['#03A9F4', '#3A416F', '#fb8c00', '#a8b8d8', '#e91e63'],
                        data: [15, 20, 12, 60, 20],
                        fill: false
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                            },
                            ticks: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                            },
                            ticks: {
                                display: false,
                            }
                        },
                    },
                },
            });
        }

        // Pie chart
        let ctx4 = document.getElementById("pie-chart");
        if (ctx4) {
            new Chart(ctx4.getContext("2d"), {
                type: "pie",
                data: {
                    labels: ['Facebook', 'Direct', 'Organic', 'Referral'],
                    datasets: [{
                        label: "Projects",
                        weight: 9,
                        cutout: 0,
                        tension: 0.9,
                        pointRadius: 2,
                        borderWidth: 2,
                        backgroundColor: ['#03A9F4', '#e91e63', '#3A416F', '#a8b8d8'],
                        data: [15, 20, 12, 60],
                        fill: false
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                            },
                            ticks: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: false,
                                drawTicks: false,
                            },
                            ticks: {
                                display: false,
                            }
                        },
                    },
                },
            });
        }

        // Bar chart
        let ctx5 = document.getElementById("bar-chart");
        if (ctx5) {
            new Chart(ctx5.getContext("2d"), {
                type: "bar",
                data: {
                    labels: ['16-20', '21-25', '26-30', '31-36', '36-42', '42+'],
                    datasets: [{
                        label: "Sales by age",
                        weight: 5,
                        borderWidth: 0,
                        borderRadius: 4,
                        backgroundColor: '#3A416F',
                        data: [15, 20, 12, 60, 20, 15],
                        fill: false,
                        maxBarThickness: 35
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                padding: 10,
                                color: '#9ca2b7',
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: true,
                                drawTicks: true,
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                color: '#9ca2b7',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });
        }

        // Bar chart horizontal
        let ctx6 = document.getElementById("bar-chart-horizontal");
        if (ctx6) {
            new Chart(ctx6.getContext("2d"), {
                type: "bar",
                data: {
                    labels: ['16-20', '21-25', '26-30', '31-36', '36-42', '42+'],
                    datasets: [{
                        label: "Sales by age",
                        weight: 5,
                        borderWidth: 0,
                        borderRadius: 4,
                        backgroundColor: '#3A416F',
                        data: [15, 20, 12, 60, 20, 15],
                        fill: false
                    }],
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                padding: 10,
                                color: '#9ca2b7',
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: false,
                                drawOnChartArea: true,
                                drawTicks: true,
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                color: '#9ca2b7',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });
        }

        // Mixed chart
        let ctx7 = document.getElementById("mixed-chart");
        if (ctx7) {
            new Chart(ctx7.getContext("2d"), {
                data: {
                    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        type: "bar",
                        label: "Organic Search",
                        weight: 5,
                        tension: 0.4,
                        borderWidth: 0,
                        pointBackgroundColor: "#3A416F",
                        borderColor: "#3A416F",
                        backgroundColor: '#3A416F',
                        borderRadius: 4,
                        borderSkipped: false,
                        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                        maxBarThickness: 10,
                    },
                        {
                            type: "line",
                            label: "Referral",
                            tension: 0.4,
                            borderWidth: 3,
                            pointRadius: 0,
                            pointBackgroundColor: "#e91e63",
                            borderColor: "#e91e63",
                            backgroundColor: "transparent",
                            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                            fill: true,
                        }
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                padding: 10,
                                color: '#b2b9bf',
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: true,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                color: '#b2b9bf',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });
        }

        // Bubble chart
        let ctx8 = document.getElementById("bubble-chart");
        if (ctx8) {
            new Chart(ctx8.getContext("2d"), {
                type: "bubble",
                data: {
                    labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90'],
                    datasets: [{
                        label: 'Dataset 1',
                        data: [{
                            x: 100,
                            y: 0,
                            r: 10
                        }, {
                            x: 60,
                            y: 30,
                            r: 20
                        }, {
                            x: 40,
                            y: 350,
                            r: 10
                        }, {
                            x: 80,
                            y: 80,
                            r: 10
                        }, {
                            x: 20,
                            y: 30,
                            r: 15
                        }, {
                            x: 0,
                            y: 100,
                            r: 5
                        }],
                        backgroundColor: '#e91e63',
                    },
                        {
                            label: 'Dataset 2',
                            data: [{
                                x: 70,
                                y: 40,
                                r: 10
                            }, {
                                x: 30,
                                y: 60,
                                r: 20
                            }, {
                                x: 10,
                                y: 300,
                                r: 25
                            }, {
                                x: 60,
                                y: 200,
                                r: 10
                            }, {
                                x: 50,
                                y: 300,
                                r: 15
                            }, {
                                x: 20,
                                y: 350,
                                r: 5
                            }],
                            backgroundColor: '#3A416F',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                padding: 10,
                                color: '#b2b9bf',
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                borderDash: [5, 5],
                                color: '#c1c4ce5c'
                            },
                            ticks: {
                                display: true,
                                color: '#b2b9bf',
                                padding: 10,
                                font: {
                                    size: 14,
                                    weight: 300,
                                    family: "Roboto",
                                    style: 'normal',
                                    lineHeight: 2
                                },
                            }
                        },
                    },
                },
            });
        }

        // Radar chart
        let ctx9 = document.getElementById("radar-chart");
        if (ctx9) {
            new Chart(ctx9.getContext("2d"), {
                type: "radar",
                data: {
                    labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
                    datasets: [{
                        label: "Student A",
                        backgroundColor: "rgba(58,65,111,0.2)",
                        data: [65, 75, 70, 80, 60, 80],
                        borderDash: [5, 5],
                    }, {
                        label: "Student B",
                        backgroundColor: "rgba(203,12,159,0.2)",
                        data: [54, 65, 60, 70, 70, 75]
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        }
                    }
                }
            });
        }


        // Radar chart
        let ctx10 = document.getElementById("polar-chart");
        if (ctx10) {
            new Chart(ctx10.getContext("2d"), {
                type: "polarArea",
                data: {
                    labels: [
                        'Red',
                        'Green',
                        'Yellow',
                        'Grey',
                        'Blue'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [11, 16, 7, 3, 14],
                        backgroundColor: ['#03A9F4', '#e91e63', '#3A416F', '#a8b8d8', '#4CAF50'],
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        }
                    }
                }
            });
        }
    }
}
