import React, {useState} from 'react';
import CommonPagination from "@/components/ui/CommonPagination";
import {ITEM_COUNT, PAGE_RANGE} from "@/utils/constant";
import VAlertRecruitListItem from "@/components/project/alert/vote/recruit/list/VAlertRecruitListItem";
import NoItemsContent from "@/components/project/alert/NoItemsContent";
import useAlertList from "@/hooks/project/useAlertList";
import {AlertType} from "@/service/project/alert/constant";
import AlertListLoader from "@/components/project/alert/AlertListLoader";
import {VAlertRecruitData} from "@/service/project/alert/type";


function VAlertRecruitList() {
    const [pageIndex, setPageIndex] = useState(0);
    const {isFetching, alertList, totalItemsCount} = useAlertList(pageIndex, AlertType.PRA1002);

    if(isFetching) return <AlertListLoader/>

    return (
        <>
            <div className='alertList'>
                {
                    totalItemsCount > 0
                        ? (
                            <ul role='list'>
                                {alertList.map((item) =>
                                    <VAlertRecruitListItem key={item.alertId} data={item as VAlertRecruitData}/>
                                )}
                            </ul>
                        )
                        : (
                            <NoItemsContent/>
                        )
                }
            </div>
            <CommonPagination
                activePage={pageIndex + 1}
                itemsCountPerPage={ITEM_COUNT.LIST_SM}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={PAGE_RANGE.DEFAULT}
                onChangePageHandler={(pageIndex: number) => setPageIndex(pageIndex - 1)}
            />
        </>
    );
}

export default VAlertRecruitList;