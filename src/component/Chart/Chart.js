import React, {useState} from "react";
import {defaults} from "chart.js/auto";
import {Bar, Doughnut, Line} from "react-chartjs-2";
import revenueData from "./revenueData.json";
import sourceData from "./sourceData.json";
import Spinner from "../spinner/spinner";
import "./char.css";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
const Chart = () => {
    const [loading, setLoading] = useState(true);
    //spinner
    setTimeout(() => {
        setLoading(false);
    }, 200);
    return (
        <div className="App">
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <div className="dataCard revenueCard">
                        <Line
                            data={{
                                labels: revenueData.map((data) => data.label),
                                datasets: [
                                    {
                                        label: "Like",
                                        data: revenueData.map((data) => data.revenue),
                                        backgroundColor: "#064FF0",
                                        borderColor: "#064FF0",
                                    },
                                    {
                                        label: "View",
                                        data: revenueData.map((data) => data.cost),
                                        backgroundColor: "#FF3030",
                                        borderColor: "#FF3030",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    line: {
                                        tension: 0.5,
                                    },
                                },
                                plugins: {
                                    title: {
                                        text: "Monthly Movie View",
                                    },
                                },
                            }}
                        />
                    </div>

                    <div className="dataCard customerCard">
                        <Bar
                            data={{
                                labels: sourceData.map((data) => data.label),
                                datasets: [
                                    {
                                        label: "Avarage",
                                        data: sourceData.map((data) => data.value),
                                        backgroundColor: [
                                            "rgba(43, 63, 229, 0.8)",
                                            "rgba(250, 192, 19, 0.8)",
                                            "rgba(253, 135, 135, 0.8)",
                                        ],
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Comment",
                                    },
                                },
                            }}
                        />
                    </div>

                    <div className="dataCard categoryCard">
                        <Doughnut
                            data={{
                                labels: sourceData.map((data) => data.label),
                                datasets: [
                                    {
                                        label: "Subscriber",
                                        data: sourceData.map((data) => data.value),
                                        backgroundColor: [
                                            "rgba(43, 63, 229, 0.8)",
                                            "rgba(250, 192, 19, 0.8)",
                                            "rgba(253, 135, 135, 0.8)",
                                        ],
                                        borderColor: [
                                            "rgba(43, 63, 229, 0.8)",
                                            "rgba(250, 192, 19, 0.8)",
                                            "rgba(253, 135, 135, 0.8)",
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        text: "Subscribe",
                                    },
                                },
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
export default Chart;
