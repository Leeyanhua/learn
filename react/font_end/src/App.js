import React from 'react';
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Button, Modal, Input, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { postEvents, postVerify, getEvents, putEvents, deleteEvents } from './Room';


BigCalendar.momentLocalizer(moment);

// radio标志
let checkFalg = false;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      visible: true,
      confirm_password: "",
      addVisible: false,
      delVisible: false,
      loginVisible: false,
      title: "",
      title_err: "",
      inputTitle: ""
    }
  }
  componentWillMount = () => {
    getEvents(null, (result) => {
      const events = result.data.map( item => {
        return {
          title: item.title,
          start: new Date(item.start),
          end:  new Date(item.end)
        }
      })
      // console.log(events);
      this.setState({ events });
    });
  }

  handleOk = (e) => {                                  /*页面起始弹出框*/
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {                              /*页面起始弹出框*/
    this.setState({
      visible: false,
    });
  }

  handleLoginOk = (e) => {
    if(this.state.title.length===0 || this.state.title===" ") {
      this.setState({title_err: "密码不能为空！"});
      return;
    }
    const start = this.state.slotStart;
    const end = this.state.slotEnd;
    const events = this.state.events;
    const newEvents = events.map( item => {
      if(item.start === start && item.end === end){
        return {
        }
      }
      return item;
    });
    const pwd = this.state.title;
    postVerify({
      pwd: pwd
    }, (result) => {
      if (result.code === 0) {
        // console.log("成功");
        this.setState({
          events: newEvents,
          loginVisible: false,
          title: "",
          title_err: ""
        });
      } else {
        // console.log("失败");
        this.setState({
          title_err: "密码错误，请重新输入！"
        });
      }
    });
  }

  handleLoginNo = (e) => {                              /*页面起始弹出框*/
    const start = this.state.slotStart;
    const end = this.state.slotEnd;
    const events = this.state.events;
    const newEvents = events.map( item => {
      if(item.start === start && item.end === end){
        return {
        }
      }
      return item;
    });
    this.setState({
      events: newEvents,
      loginVisible: false,
      title: "",
      title_err: "",
      confirm_password: ""
    });
  }

  handleAddOk = (e) => {                             /*确认新增*/

    if(this.state.title.length===0 || this.state.title===" "){
      //alert("请输入事件名称！");
      this.setState({title_err: "请输入事件名称！"});
      return;
    }

    const start = this.state.slotStart;
    const end = this.state.slotEnd;
    let events = this.state.events;
    events.pop();
    let newEvents = [];
    if (checkFalg) {
      const st = start.getTime();
      const en = end.getTime();
      const ti = this.state.title;
      for (let i=0; i<=7; i++) {                        //单选重复八周事件
        newEvents.push({
          start: new Date(st + 7 * 24 * 3600 * 1000*i),
          end: new Date(en  + 7 * 24 * 3600 * 1000*i),
          title: ti
        })
      }
    } else {
      newEvents.push({
        start,
        end,
        title: this.state.title
      });
    }

    events = events.concat(newEvents);
    // console.log('neweEvents', events);

    postEvents({
      weeks: newEvents
    }, (result) => {
      if (result.code === 0) {
        // console.log("成功");
      }
    });

    this.setState({
      events,
      addVisible: false,
      title: ""
    });
  }
  handleAddNo = (e) => {                               /*取消新增*/
    const start = this.state.slotStart;
    const end = this.state.slotEnd;
    const events = this.state.events;
    const newEvents = events.map( item => {
      if(item.start === start && item.end === end){
        return {
        }
      }
      return item;
    });
    this.setState({
      events: newEvents,
      addVisible: false,
      title: "",
      title_err: ""
    });
  }

  handleEdiOk = (e) => {                               /*确认修改*/
    const start = this.state.eventStart;
    const end = this.state.eventEnd;
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
      delVisible: false,
      events: newEvents,
      title: ""
    });
    putEvents({
      start: start,
      newTitle: this.state.title
    }, (result) => {
      // console.log('post self info', start);
      if (result.code === 0) {
        // console.log("成功");
      }
    });
  }

  handleEdiNo = (e) => {                               /*取消修改*/
    // console.log(e);
    this.setState({
      delVisible: false,
      title: ""
    });
  }

  handleDel = (e) => {                                 /*删除事件*/
    const start = this.state.eventStart;
    const end = this.state.eventEnd;
    const events = this.state.events;
    const newEvents = events.map( item => {
      if(item.start === start && item.end === end){
        return {
          start
        }
      }
      return item;
    });
    this.setState({
      events: newEvents,
      delVisible: false,
      title: ""
    });

    deleteEvents({
      start: start
    }, (result) => {
      // console.log('post self info', start);
      if (result.code === 0) {
      }
    });
  }

  onChangeCheck = (e) => {
    checkFalg = !checkFalg;

  }
  onChangeInput = (e) => {
    this.setState({
      title: e.target.value,
      inputTitle: e.target.value
    })
  }

  onChangeAdd = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  onChangeLogin = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  selectSlot = (slotInfo) => {              //框选事件
    const evts = this.state.events;
                                            //避免框选重复
    for(let i=0; i< evts.length; i++){
      if(slotInfo.end > evts[i].start && slotInfo.start < evts[i].end){
        Modal.error({
          title: '提示',
          content: "该时间段已有会议安排"
        });
        return;
      }
    }
    
    if (this.state.confirm_password !== "") {
      if (slotInfo.start > new Date()) {
        evts.push({
          start: slotInfo.start,
          end: slotInfo.end
        });
        this.setState({
          events: evts,
          addVisible: true,
          slotStart: slotInfo.start,
          slotEnd: slotInfo.end
        });
      }
    } else {
      this.setState({
        events: evts,
        loginVisible: true,
        slotStart: slotInfo.start,
        slotEnd: slotInfo.end,
        confirm_password: 1
      });
    }
  }

  selectEvent = (event) => {           //鼠标点击事件
    if (this.state.confirm_password !== "") {
      if (event.start > new Date()) {
        this.setState({
          delVisible: true,
          eventStart: event.start,
          eventEnd: event.end,
          inputTitle: event.title
        });
      }
    } else {
      this.setState({
        loginVisible: true,
        eventStart: event.start,
        eventEnd: event.end,
        inputTitle: event.title,
        confirm_password: 1
      });
    }
  }

  render() {
    return (
      <div>
        <div>
         <Modal
           title="单击以编辑事件信息，或将鼠标拖动到日历上以选择日期/时间范围。"
           visible={this.state.visible}
           onOk={this.handleOk}
           onCancel={this.handleCancel}
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
            title="请输入管理员密码"
            visible={this.state.loginVisible}
            onOk={this.handleLoginOk}
            onCancel={this.handleLoginNo}
          >
          <Input size="large" value={this.state.title} type="password" onChange={this.onChangeLogin} />
          <label style={{color:"red"}}> {this.state.title_err} </label>
          </Modal>

          <Modal
            title="新增事件信息"
            visible={this.state.addVisible}
            onOk={this.handleAddOk}
            onCancel={this.handleAddNo}
          >
            <Input size="large" value={this.state.title} onChange={this.onChangeAdd}/>
            <label style={{color:"red"}}> {this.state.title_err} </label>
            <br/>
            <br/>
            <Checkbox  onChange={this.onChangeCheck}>
            后八周重复此事件
            </Checkbox>
          </Modal>

          <Modal
            title="编辑事件信息"
            visible={this.state.delVisible}
            onCancel={this.handleEdiNo}
            footer={[
              <Button key="delete" type="danger" style={{float:"left"}} size="large" onClick={this.handleDel}>删除</Button>,
              <Button key="submit"  size="large"  onClick={this.handleEdiNo}>取消</Button>,
              <Button key="cancel" type="primary" size="large"  onClick={this.handleEdiOk}>确认</Button>,
            ]}>
            <Input size="large" value={this.state.inputTitle} onChange={this.onChangeInput}/>
            <br/>
            <br/>
          </Modal>
        </div>

        <div {...this.props}>
          <BigCalendar
            selectable
            events={this.state.events}
            defaultView='week'
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(2017, 7, 1)}

            onSelectEvent={this.selectEvent}
            onSelectSlot={this.selectSlot}
          />
        </div>
      </div>
    )
  }
}

export default App;
