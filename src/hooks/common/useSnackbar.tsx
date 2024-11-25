import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";

export default function useSnackbar(){
    const setSnackbar = useSetRecoilState(snackbarState);

    function setSuccessSnackbar(content:string){
        setSnackbar({show:true, type:"SUCCESS", content});
    }

    function setErrorSnackbar(content:string){
        setSnackbar({show:true, type:"ERROR", content});
    }

    function setInfoSnackbar(content:string){
        setSnackbar({show:true, type:"INFO", content});
    }

    return {setSuccessSnackbar, setErrorSnackbar, setInfoSnackbar};
}