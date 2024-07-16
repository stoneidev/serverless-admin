"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// components
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings";

// const api = axios.create({
//   // baseURL: "https://imd1uugvp4.execute-api.ap-northeast-2.amazonaws.com/prod",
//   baseURL: process.env.API_GW_URL,
// });

// // API 요청 함수
// const fetchDashboardData = async () => {
//   const { data } = await api.get("/hello");
//   return data;
// };

const Dashboard = () => {
  // useQuery 훅 사용
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["dashboardData"],
  //   queryFn: fetchDashboardData,
  // });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <PageContainer title="Dashboard" description="this is Dashboard for s&I">
      <Box>
        {/* {data.message}, */}
        API GW URL : {process.env.API_GW_URL}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
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
