// 初始全局配置
var originData = {
  activeListId: '',
  listData: [],
  html: '',
  parent: $('.clubList'),
  templateFn: function(p) {
    return '<li id=' +p.clubid + ' class="club">' +
                        '<strong>' +p.clubName + '</strong>' +
                        '<div class="staticList">' +
                            '<span>id:<span>' +p.clubid + '</span></span>' +
                            '<span>房卡:<span>' +p.card + '</span></span>' +
                        '</div>' +
                        '<div class="dynamicList">' +
                            '<a href="memberControl.html?"' + p.clubid +'>成员</a>' +
                            '<a class="dissolveBtn" clubid=' +p.clubid + '>解散俱乐部</a>' +
                            '<a class="rechargeBtn" clubid=' +p.clubid + '>房卡充值</a>' +
                        '</div>' +
                    '</li>';
  }
}
function init() {
  initData(function(data) {
    originData.listData = data;
    renderList(originData.listData);
    bindEvents();
  });
}
// 初始化数据
function initData(cb) {
  // $.ajax()从后台请求数据。
  // 此处使用模拟数据
  setTimeout(function() {
    var clubs = [
      {clubName: 'name1', clubid: 'p1', card: '23a'},
      {clubName: 'name2', clubid: 'p2', card: '23b'},
      {clubName: 'name2', clubid: 'p3', card: '23c'},
    ]
    cb(clubs);
  }, 1000)

}

// 渲染list
function renderList(data) {
  if (!originData.html) {
    $.each(data,function(i, p){
      originData.html += originData.templateFn(p);
    });
    originData.parent.html(originData.html);
  } else {
    diffDom(originData.listData, data, 'clubid');
  }
}
// 比较dom异同，并对不同的进行处理

function diffDom(origin, current, flag) {
  origin.forEach(function(ele) {
    var ret = current.filter(function(e) {
       return e[flag] === ele[flag];
    });
    if (ret.length === 0) {
      offListEvents($('.' + ele[flag]))
      removeBrother(ele, flag);
    }
  });

  current.forEach(function(ele) {
    var ret = origin.filter(function(e) {
      return e[flag] === ele[flag];
    });

    if (ret.length === 0) {
      var $ele = addBrother(ele, flag);
      bindListEvents($ele);
    }
  });
  originData.listData = current;

}

// 添加dom元素
function addBrother(ele, flag) {
  var element = originData.templateFn(ele);
  originData.parent.append(element);
  return originData.parent.last();
}

// 删除dom元素
function removeBrother(ele, flag) {
  $('#' + ele[flag]).remove();
}
// 显示模态框
function showModel(modelClass) {
  $(modelClass).show();
}
// 影藏模态框
function hideModel(modelClass) {
  $(modelClass).hide();
}

// 绑定事件
function bindEvents() {
  bindHeadButtonEvents();//绑定头部按钮事件
  bindListEvents($('.club'));//绑定列表内部事件
  bindCreateModelEvents();// 绑定创建框事件
  bindDissolveModelEvents();//绑定解散俱乐部模态框内部事件
  bindRechargeModelEvents(); //绑定房卡充值模态框内部事件
}

// 绑定头部按钮事件
function bindHeadButtonEvents() {
  $('.create').click(function() {
    showModel('.createClub');
  });
}

// 绑定创建框事件
function bindCreateModelEvents() {
  $('.createBtn').click(function() {
    var val = $('#createClubIpt').val();
    if (!val) return;
      var lists = originData.listData.concat({
        clubName: val,
        clubid: 'p' + (originData.listData.length + 1),
        card: Math.random()
      })
    renderList(lists);
  })
}

// 绑定list上事件
function bindListEvents($dom) {
  // 解散俱乐部绑定点击事件
  console.log('dom元素为： ', $dom);
  console.log('解散元素为：', $dom.find('.dissolveBtn'))
  $dom.find('.dissolveBtn').click(function() {
    originData.activeListId = $(this).attr('clubid');
    showModel('.dissolveModel')
    // showDissolveModel();
  });
  // 房卡重置绑定点击事件
  $dom.find('.rechargeBtn').click(function() {
    showModel('.rechargeModel')
  })
}

// 解除list事件绑定
function offListEvents($dom) {
  $dom.find('.dissolveBtn').off('click');
  $dom.find('.rechargeBtn').off('click');
}

// 绑定解散俱乐部模态框内部事件
function bindDissolveModelEvents() {
  // 解散俱乐部模态框确定按钮绑定事件
  $('.dissolveModel .sure').click(function() {
    console.log(222)
    if (!originData.activeListId) return;
    console.log('你点击的列表ID是：', originData.activeListId);
    console.log('即将删除这条记录。。。');
    // 解除事件绑定
    // offListEvents();
    var data = originData.listData.filter(function(e) {
      return e.clubid !== originData.activeListId;
    });
    console.log('删除记录成功，即将渲染剩余list');
    renderList(data);
    // 重新绑定事件
    // bindListEvents();
    originData.activeListId = '';
    hideModel('.dissolveModel');
    console.log('隐藏模态框');
  });
  $('.dissolveModel .cancel').click(function() {
    if (!originData.activeListId) return;
    originData.activeListId = '';
    hideModel('.dissolveModel');
    console.log('隐藏模态框');
  });
}

//绑定房卡充值模态框内部事件
function bindRechargeModelEvents() {
  $('.rechargeModel .sure').click(function() {
    hideModel('.rechargeModel');
  });

  $('.rechargeModel .cancel').click(function() {
    hideModel('.rechargeModel');
  })
}
init();