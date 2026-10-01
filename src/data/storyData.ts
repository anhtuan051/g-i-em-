import { CoupleInfo, StoryMilestone, PolaroidPhoto } from '../types';

export const DEFAULT_COUPLE: CoupleInfo = {
  partner1: 'Anh',
  partner2: 'Em',
  startDate: '2024-04-01',
  songTitle: 'Until I Found You - Piano Lofi',
  subheading: 'Câu chuyện của chúng ta, từ một lời tỏ tình đến một tình yêu thật đẹp'
};

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    id: 'meet',
    date: '2024-04-01',
    displayDate: '01 Tháng 04, 2024',
    title: 'Ngày anh bày tỏ tình cảm với em',
    tag: 'Ngày câu chuyện bắt đầu',
    iconType: 'sparkles',
    location: '',
    image: '/src/assets/images/love_coffee_date_1790841388015.jpg',
    content: [
      'Ngày 01 tháng 04 năm 2024, anh đã lấy hết can đảm để bày tỏ tình cảm với em.',
      'Nhưng lúc đó em vẫn chưa đồng ý, thế là anh lại phải “đe dọa” em một chút. 😆',
      'Không ngờ từ sau ngày hôm đó, em bắt đầu thấy anh đẹp trai hơn và cũng dần dần yêu anh nhiều hơn.'
    ]
  },

  {
    id: 'love',
    date: '2024-04-01',
    displayDate: 'Từ ngày ấy',
    title: 'Từ lúc nào em đã yêu anh',
    tag: 'Tình cảm lớn dần',
    iconType: 'heart',
    location: '',
    image: '/src/assets/images/love_city_lights_1790841418378.jpg',
    content: [
      'Thời gian cứ thế trôi qua, tình cảm của em dành cho anh cũng ngày một nhiều hơn.',
      'Anh đã dần dần chiếm trọn trái tim và tình cảm của em lúc nào chẳng hay.',
      'Có lẽ tình yêu đôi khi không đến trong một khoảnh khắc, mà lớn lên từng chút một qua những ngày chúng ta ở bên nhau.'
    ]
  },

  {
    id: 'personality',
    date: '2024-04-01',
    displayDate: 'Khi em bắt đầu là chính mình',
    title: 'Cô gái hâm hấp mà anh vẫn yêu',
    tag: 'Con người thật của em',
    iconType: 'sunset',
    location: '',
    image: '/src/assets/images/love_sunset_walk_1790841368082.jpg',
    content: [
      'Khi đã yêu anh đủ nhiều, em cũng dần bộc lộ tính cách thật của mình.',
      'Một cô gái hơi hâm hấp, đôi lúc hay chửi anh và làm anh không biết phải nói gì. 😂',
      'Có những lúc anh cũng rất bực, nhưng vì anh yêu em nên cuối cùng anh vẫn nhịn em.'
    ]
  },

  {
    id: 'together',
    date: '2025-01-01',
    displayDate: 'Những ngày chúng ta bên nhau',
    title: 'Càng ở bên càng thương em',
    tag: 'Những điều bình dị',
    iconType: 'star',
    location: '',
    image: '/src/assets/images/love_stargazing_1790841404032.jpg',
    content: [
      'Anh nhận ra rằng yêu một người không phải lúc nào cũng là những khoảnh khắc ngọt ngào.',
      'Đôi khi sẽ có những lúc giận dỗi, cãi nhau và những lần em làm anh phát bực.',
      'Nhưng sau tất cả, anh vẫn muốn ở bên em, bởi vì người anh yêu vẫn luôn là em.'
    ]
  },

  {
    id: 'forever',
    date: '2026-10-01',
    displayDate: 'Hôm nay & Những ngày sau',
    title: 'Vẫn là em, vẫn là chúng ta',
    tag: 'Câu chuyện chưa kết thúc',
    iconType: 'ring',
    location: 'Nơi có chúng ta',
    content: [
      'Từ một lời tỏ tình mà em từng không đồng ý, chúng ta đã đi cùng nhau đến tận hôm nay.',
      'Anh biết em đôi khi hâm hấp, hay chửi anh và cũng có những lúc khiến anh rất bực.',
      'Nhưng anh vẫn yêu em, vẫn muốn nhịn em và vẫn muốn cùng em viết tiếp câu chuyện này.',
      'Hy vọng rằng sau này nhìn lại, chúng ta vẫn có thể mỉm cười vì đã chọn ở bên nhau. ❤️'
    ]
  }
];

export const POLAROID_PHOTOS: PolaroidPhoto[] = [
  {
    id: 'p1',
    image: '/src/assets/images/love_sunset_walk_1790841368082.jpg',
    caption: 'Những khoảnh khắc bên em',
    date: '01.04.2024',
    location: '',
    rotation: '-rotate-2',
    note: 'Từ ngày ấy, anh đã có thêm một người để thương, để nhớ và để nhịn mỗi ngày. ❤️'
  },

  {
    id: 'p2',
    image: '/src/assets/images/love_coffee_date_1790841388015.jpg',
    caption: 'Ngày câu chuyện bắt đầu',
    date: '01.04.2024',
    location: '',
    rotation: 'rotate-3',
    note: 'Ngày anh bày tỏ tình cảm, cũng là ngày câu chuyện của chúng ta bắt đầu.'
  },

  {
    id: 'p3',
    image: '/src/assets/images/love_stargazing_1790841404032.jpg',
    caption: 'Càng lâu càng thương',
    date: '2025',
    location: '',
    rotation: '-rotate-1',
    note: 'Thời gian trôi qua, anh càng nhận ra mình thương em nhiều hơn.'
  },

  {
    id: 'p4',
    image: '/src/assets/images/love_city_lights_1790841418378.jpg',
    caption: 'Cô gái anh vẫn yêu',
    date: 'Hôm nay',
    location: '',
    rotation: 'rotate-2',
    note: 'Dù em có hâm hấp và hay chửi anh thế nào, anh vẫn yêu em. ❤️'
  }
];