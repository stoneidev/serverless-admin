"use client";
import React from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import DashboardCard from "../../components/shared/DashboardCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const rows: GridRowsProp = [
  {
    id: 1,
    name: "OnBoarding",
    description: "가입했을 때 보내는 이메일의 Template",
  },
  {
    id: 2,
    name: "Churn",
    description: "서비스 이용을 중단했을 때 사용하는 Template",
  },
  { id: 3, name: "Order", description: "주문확인을 위한 이메일 Template" },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "description", headerName: "Description", flex: 1 },
];

const Template = () => {
  const router = useRouter();

  const handleAddTemplate = () => {
    alert("템플릿 추가 버튼 클릭됨");
  };

  const handleRowClick = (params: any) => {
    router.push(`template/${params.row.id}`);
  };

  return (
    <PageContainer title="Template" description="email template page">
      <DashboardCard title="Email Template">
        <div>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mb={2}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTemplate}
            >
              템플릿 추가
            </Button>
          </Box>

          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                fontWeight: 700,
                fontSize: 16,
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                backgroundColor: "rgba(235, 235, 235, 0.581)", // 회색 배경 추가
              },
              // "& .MuiDataGrid-cell": {
              //   borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              // },
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              },
              // "& .MuiDataGrid-virtualScroller": {
              //   borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              // },
            }}
            autoHeight
          />
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default Template;
