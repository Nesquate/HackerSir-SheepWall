var API_URL = 'http://127.0.0.1:8080/api/';

class SheepWallUpdate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: Array(0),
        };
    }
    // 把接收到的資料以表格繪製
    componentDidMount(){
        
    }

    componentWillUnmount(){

    }

    openUpdate(){
        this.timerID = setInterval(
            () => this.createData()
            , 2000);
    }

    clearData(){
        clearInterval(this.timerID);
        this.setState({
            data: Array(0),
        });
    }

    getDataFromServer(httpServer){
    // TODO : 使用 Fetch API 與綿羊牆伺服器串接
        
    }

    createData(datas){
        const currentData = this.state.data;
        const newData = currentData.slice();
        
        fetch(API_URL, {
            method: 'POST',
        }).then(response => {
            return response.json();
        }).then(recvData =>{
            if(recvData["requests"].length != 0){
                for(var an_item of recvData["requests"]){
                    if(an_item["sensitives"].length != 0){
                        console.log(an_item);
                        var appendText = '';
                        for(var texts of an_item["sensitives"]){
                            appendText = appendText + texts + ' ';
                        }
                        newData.unshift({
                            index: newData.length,
                            time: an_item["time"],
                            url: an_item["source"],
                            content: appendText,
                        });
                    }
                }
                this.setState({
                    data: newData,
                });
            }
        }).catch(function(err){
            console.log(err);
        });
        // newData.length = newData.length + 1;
        //const time = new Date().toISOString();
        // newData.unshift({
        //     index: newData.length,
        //     time: time,
        //     url: "1111",
        //     content: "Hao",
        // });
        // this.setState({
        //     data: newData,
        // });
    }
    render(){
        const recvData = this.state.data;
        const listItems = recvData.map((data) => 
            <tr key={data.index} data-toggle='modal' data-target='#moreDetail' className='information'>
                <td>{data.time}</td>
                <td>{data.url}</td>
                <td>{data.content}</td>
            </tr>
        );
        return(
            <div className="updateData">
                <div className="switchButton">
                    <button className="btn btn-primary btn-sm" type="button" style={{margin: '5px'}} onClick={() => this.openUpdate()}>
                        <i class="fa fa-play"></i>
                         Start
                    </button>
                    <button className="btn btn-primary btn-sm" type="button" style={{margin: '5px'}} onClick={() => clearInterval(this.timerID)}>
                        <i class="fa fa-pause"></i>
                         Pause
                    </button>
                    <button className="btn btn-primary btn-sm" type="button" style={{margin: '5px'}} onClick={() => this.clearData()}>
                        <i className="fas fa-trash-alt"></i>
                            Clear
                    </button>
                </div>
                <div className="dataTable">
                    <table className="table table-striped main">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Source</th>
                                <th>Sensitives</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-auto">
                            {listItems}
                        </tbody>
                    </table>  
                </div>
            </div>
            
        );
            
    }
}

ReactDOM.render(
    <SheepWallUpdate />,
    document.getElementById('info-update')
);



function runUpdate(){
    var openButton = document.querySelector('#start_but');
    var closeButton = document.querySelector('#stop_but');
}




