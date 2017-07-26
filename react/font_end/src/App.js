import React from 'react';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Modal, Input, message } from 'antd';
import 'antd/dist/antd.css';
import { postEvents } from './Room';


BigCalendar.momentLocalizer(moment);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      visible: true,
      alertVisible: false
    }
  }

  handleOk = (e) => {
    const start = this.state.yesStart;
    const end = this.state.yesEnd;
    const events = this.state.events;
    const newEvents = events.map( item => {
      if(item.start === start && item.end === end){
        return {
          start,
          end,
          title: this.state.title
        }
      }
      return item;
    });
    this.setState({
      events: newEvents,
      alertVisible: false,
      title: "",
      visible: false,
    });
    postEvents({
    	title: this.state.title,
      start:  start,
      end:  end
    },(result) => {
      if (result.code===0) {
        console.log("result", result);
        message.success("成功");
      }
    });
  }
  handleCancle = (e) => {
    console.log(e);
    this.setState({
      alertVisible: false,
      title: "",
      visible: false
    });
  }

  render() {
    return (
      <div>
        <div>
         <Modal
           title="单击以编辑事件信息，或将鼠标拖动到日历上以选择日期/时间范围。"
           visible={this.state.visible}
           onOk={this.handleOk}
           onCancel={this.handleCancle}
         >
           <h3>
             &nbsp;&nbsp;
             为了便于大家使用实验室会议室及展区空间，基于以下三个维度制度本规则：方便企业使用、避免使用冲突、避免浪费资源。
             <br/>
             <br/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             1、会议室提供预约系统，企业使用会议室及展区空间需提前预约，可预订时间范围为一星期内。
             <br/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             2、会议室资源有限，使用时间单元以半小时计算，目前入驻企业已有七家，
             每家每周工作时间（工作日9:00-18:00）使用合计不超过4小时，非工作日时间使用合计不超过2小时。
             <br/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             3、对于超过使用时间的，需要承担会议室额外使用费用，为：10元/半小时。
             <br/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             4、费用核算以预约系统为准。若预约后未使用亦未取消的，仍按使用计算。取消预约需提前三小时。
             <br/>
             <br/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             本规则从7月30日开始执行，实验室对接人为：张旻驰(18694063428)。
           </h3>
          </Modal>
          <Modal
            title="编辑事件信息"
            visible={this.state.alertVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancle}
          >
            <Input size="large" value={this.state.title} onChange={(e) => {
              this.setState({
                title: e.target.value
              })
            }}/>
          </Modal>
        </div>
        <div {...this.props}>
          <BigCalendar
            selectable
            events={this.state.events}
            defaultView='week'
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(2017, 7, 25)}

            onSelectEvent={(event) => {
              // console.log(event);
              this.setState({
                alertVisible: true,
                yesStart: event.start,
                yesEnd: event.end
              });
            }}

            onSelectSlot={(slotInfo) => {
              const evts = this.state.events;
              evts.push({
                start: slotInfo.start,
                end: slotInfo.end
              });
              this.setState({
                events: evts,
                alertVisible: true,
                yesStart: slotInfo.start,
                yesEnd: slotInfo.end
              });
            }}
          />
        </div>
      </div>
    )
  }
}

export default App;
