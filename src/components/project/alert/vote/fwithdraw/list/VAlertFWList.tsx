import React, {useState} from 'react';
import {VAlertFWData} from "@/service/project/alert/type";
import CommonPagination from "@/components/ui/CommonPagination";
import {ITEM_COUNT, PAGE_RANGE} from "@/utils/constant";
import VAlertFwListItem from "@/components/project/alert/vote/fwithdraw/list/VAlertFWListItem";
import NoItemsContent from "@/components/project/alert/NoItemsContent";
import useAlertList from "@/hooks/project/useAlertList";
import {AlertType} from "@/service/project/alert/constant";
import AlertListLoader from "@/components/project/alert/AlertListLoader";


function VAlertFwList() {
    const [pageIndex, setPageIndex] = useState(0);
    const {isFetching, alertList, totalItemsCount} = useAlertList(pageIndex, AlertType.PRA1003);

    if(isFetching) return <AlertListLoader/>

    return (
        <>
            <div className='alertList'>
                {
                    totalItemsCount > 0
                        ? (
                            <ul role='list'>
                                {alertList.map((item) =>
                                    <VAlertFwListItem key={item.alertId} data={item as VAlertFWData}/>)}
                            </ul>
                        ) :
                        (
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

export default VAlertFwList;