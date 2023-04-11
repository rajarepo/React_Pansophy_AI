import React from 'react';
import { DashboardLayout } from 'layout';

const IncomeOverview = () => {
    return (
        <DashboardLayout>
            <div className=" bg-[#1A1A27]  px-[40px] py-[5px] md:px-[40px] flex items-center gap-5">
                <h2 className="text-xl font-normal text-white">Datasets</h2>
            </div>
        </DashboardLayout>
    );
};
export default IncomeOverview;