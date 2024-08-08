"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

// components
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings";
import api from "@/utils/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { LineSeriesType } from "@mui/x-charts";
import DashboardCard from "./components/shared/DashboardCard";

const uData = [0, 3, 4, 0, 0, 0, 0, 6, 7, 4, 0, 0, 2, 3, 4, 5, 4];
const xLabels = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];

const dailyWorkItem = [
  {
    day: new Date("2024-08-06"),
    done: 2,
    doing: 9,
    backlog: 8,
  },
  {
    day: new Date("2024-08-07"),
    done: 7,
    doing: 8,
    backlog: 12,
  },
  {
    day: new Date("2024-08-08"),
    done: 7,
    doing: 8,
    backlog: 12,
  },
  {
    day: new Date("2024-08-09"),
    done: 7,
    doing: 8,
    backlog: 12,
  },
  {
    day: new Date("2024-08-10"),
    done: 7,
    doing: 8,
    backlog: 12,
  },
  {
    day: new Date("2024-08-11"),
    done: 7,
    doing: 8,
    backlog: 12,
  },
  {
    day: new Date("2024-08-12"),
    done: 7,
    doing: 8,
    backlog: 12,
  },
  {
    day: new Date("2024-08-13"),
    done: 7,
    doing: 8,
    backlog: 12,
  },
  {
    day: new Date("2024-08-14"),
    done: 7,
    doing: 8,
    backlog: 14,
  },
  {
    day: new Date("2024-08-15"),
    done: 7,
    doing: 8,
    backlog: 16,
  },
  {
    day: new Date("2024-08-16"),
    done: 7,
    doing: 8,
    backlog: 16,
  },
  {
    day: new Date("2024-08-17"),
    done: 7,
    doing: 8,
    backlog: 16,
  },
  {
    day: new Date("2024-08-18"),
    done: 10,
    doing: 8,
    backlog: 16,
  },
];

const keyToLabel: { [key: string]: string } = {
  backlog: "Backlog",
  doing: "Doing",
  done: "Done",
};

const colors: { [key: string]: string } = {
  // other: "lightgray",
  // bio: "lightgreen",
  // solar: "yellow",
  // wind: "lightblue",
  // hydro: "blue",
  // nuclear: "orange",
  done: "lightblue",
  doing: "blue",
  backlog: "orange",
};

const stackStrategy = {
  stack: "total",
  area: true,
  stackOffset: "none", // To stack 0 on top of others
};

const customize = {
  height: 300,
  legend: { hidden: true },
  margin: { top: 5 },
};

// API 요청 함수
const fetchDashboardData = async () => {
  const session = await fetchAuthSession();
  const idToken = session.tokens?.idToken;
  const { data } = await api.get("/sales", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return data;
};

const fetchPublicData = async () => {
  const { data } = await api.get("/public");
  return data;
};

const Dashboard = () => {
  // useQuery 훅 사용
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  const {
    data: publicData,
    isLoading: isPublicLoading,
    error: publicError,
  } = useQuery({
    queryKey: ["publicData"],
    queryFn: fetchPublicData,
  });

  if (isLoading || isPublicLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <PageContainer title="Dashboard" description="this is Dashboard for s&I">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <DashboardCard title="CFD Chart">
              <LineChart
                xAxis={[
                  {
                    scaleType: "utc",
                    disableTicks: true,
                    dataKey: "day",
                    valueFormatter: (value: string) => {
                      const date = new Date(value);
                      const month = (date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const day = date.getDate().toString().padStart(2, "0");
                      return `${month}-${day}`;
                    },

                    tickMinStep: 3600 * 1000 * 24, // min step: 24h
                  },
                ]}
                series={
                  Object.keys(keyToLabel).map((key) => ({
                    dataKey: key,
                    label: keyToLabel[key],
                    color: colors[key],
                    showMark: false,
                    curve: "linear",
                    ...stackStrategy,
                  })) as LineSeriesType[]
                }
                dataset={dailyWorkItem}
                {...customize}
              />
            </DashboardCard>
          </Grid>
          <Grid item xs={12} lg={4}>
            <DashboardCard title="Lead Time">
              <BarChart
                height={300}
                series={[{ data: uData, id: "uvId" }]}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
              />
            </DashboardCard>
          </Grid>
          <Grid item xs={12} lg={8}>
            <SalesOverview
              eaningsData={data.sales.eanings}
              expenseData={data.sales.expense}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
