import React, {useState} from 'react';
import useAlertList from "@/hooks/project/useAlertList";
import {AlertType} from "@/service/project/alert/constant";
import AlertListLoader from "@/components/project/alert/AlertListLoader";
import CommonPagination from "@/components/ui/CommonPagination";
import {ITEM_COUNT, PAGE_RANGE} from "@/utils/constant";
import {AlertCrewData} from "@/service/project/alert/type";
import NoItemsContent from "@/components/project/alert/NoItemsContent";
import AlertCrewListItem from "@/components/project/alert/crew/list/AlertCrewListItem";

function AlertCrewList() {
    const [pageIndex, setPageIndex] = useState(0);
    const {isFetching, alertList, totalItemsCount} = useAlertList(pageIndex, AlertType.PRA2001);

    if (isFetching) return <AlertListLoader/>;

    return (
        <>
            <div className='alertList'>
                {
                    totalItemsCount > 0
                        ? (
                            <ul role='list'>
                                {alertList.map((item) =>
                                    <AlertCrewListItem key={item.alertId} data={item as AlertCrewData}/>)}
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

export default AlertCrewList;