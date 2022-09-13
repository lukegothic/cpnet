import LoadParcelasPerimetroAOI from "./Actions/LoadParcelasPerimetroAOI";
import GetParcelasInsideAOI from "./Actions/GetParcelasInsideAOI";
import './ActionToolbar.css';
import UnionParcelasAOI from "./Actions/UnionParcelasAOI";

const ActionToolbar = ({ aoi, setAOI, parcelas, setParcelas }) => {
    return <div className="action-toolbar">
        { aoi && <LoadParcelasPerimetroAOI aoi={aoi} setAOI={setAOI} setParcelas={setParcelas} /> }
        { aoi && parcelas && parcelas.length > 0 && <UnionParcelasAOI aoi={aoi} setAOI={setAOI} parcelas={parcelas} setParcelas={setParcelas} /> }
        { aoi && <GetParcelasInsideAOI aoi={aoi} setParcelas={setParcelas} /> }
    </div>;
}
export default ActionToolbar;
