import {withSentry} from '@sentry/nextjs';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' },)
// },
const handler = async (req, res) => {
  res.status(200).json(
    {
      pagination: {
        page: 1,
        per_page: 12,
        number_of_page: 10,
        total_product_quantity: 4,
        actual_product_quantity: 4,
      },
      categories: [
        {
          id: 2,
          name: 'food_and_beverage',
          name_kana: '食品・飲料',
        },
      ],
      products: [
        {
          id: 8,
          name: '『大好評』江戸和竿についてご紹介しています。',
          price: 89.62,
          thumb_url: null,
          is_favorite_product: true,
          seller_info: {
            id: 3,
            name: '中台泰夫',
            catch_phrase: '木地部門　伝統工芸士',
            introduction: '<p class=\'description\'>Bộ Y tế điều chỉnh nhóm cần trì hoãn tiêm chủng từ 5 xuống 3, trong Hướng dẫn tạm thời Khám sàng lọc trước khi tiêm vaccine phòng Covid-19, ban hành ngày 10/8.</p>',
            description: '<li><h3 class=\'title_news\'><a data-medium=\'Item-2\' data-thumb=\'0\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html\' title=\'Vaccine trong nước được cấp phép theo cơ chế đặc thù\' data-itm-source=\'#vn_source=Home&amp;vn_campaign=ThuongVien&amp;vn_medium=Item-2&amp;vn_term=Desktop&amp;vn_thumb=0\' data-itm-added=\'1\'>Vaccine trong nước được cấp phép theo cơ chế đặc thù</a></h3><p class=\'description\'><a data-medium=\'Item-2\' data-thumb=\'0\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html\' title=\'Vaccine trong nước được cấp phép theo cơ chế đặc thù\' data-itm-source=\'#vn_source=Home&amp;vn_campaign=ThuongVien&amp;vn_medium=Item-2&amp;vn_term=Desktop&amp;vn_thumb=0\' data-itm-added=\'1\'>Thuốc điều trị, vaccine Covid-19 sản xuất trong nước đang thử nghiệm m sàng, đã có kết quả đánh giá giữa kỳ giai đoạn ba, sẽ được xem xét cấp phép lưu hành.</a><span class=\'meta-news\'>\n            <a class=\'count_cmt\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html#box_comment_vne\' style=\'white-space: nowrap; display: inline-block;\'>\n                <svg class=\'ic ic-comment\'><use xlink:href=\'#Comment-Reg\'></use></svg>\n                <span class=\'font_icon widget-comment-4338511-1\'>13</span>\n            </a>\n        </span></p></li>',
            avatar_url: null,
          },
          tags: [
            {
              id: 2,
              name: '農薬節約栽培',
            },
          ],
        },
        {
          id: 7,
          name: '『大好評』東京手描友禅についてご紹介しています。',
          price: 35.7,
          thumb_url: null,
          is_favorite_product: false,
          seller_info: {
            id: 1,
            name: '小田原漆器',
            catch_phrase: '木地部門　伝統工芸士',
            introduction: '<p class=\'description\'>Bộ Y tế điều chỉnh nhóm cần trì hoãn tiêm chủng từ 5 xuống 3, trong Hướng dẫn tạm thời Khám sàng lọc trước khi tiêm vaccine phòng Covid-19, ban hành ngày 10/8.</p>',
            description: '<li><h3 class=\'title_news\'><a data-medium=\'Item-2\' data-thumb=\'0\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html\' title=\'Vaccine trong nước được cấp phép theo cơ chế đặc thù\' data-itm-source=\'#vn_source=Home&amp;vn_campaign=ThuongVien&amp;vn_medium=Item-2&amp;vn_term=Desktop&amp;vn_thumb=0\' data-itm-added=\'1\'>Vaccine trong nước được cấp phép theo cơ chế đặc thù</a></h3><p class=\'description\'><a data-medium=\'Item-2\' data-thumb=\'0\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html\' title=\'Vaccine trong nước được cấp phép theo cơ chế đặc thù\' data-itm-source=\'#vn_source=Home&amp;vn_campaign=ThuongVien&amp;vn_medium=Item-2&amp;vn_term=Desktop&amp;vn_thumb=0\' data-itm-added=\'1\'>Thuốc điều trị, vaccine Covid-19 sản xuất trong nước đang thử nghiệm lâm sàng, đã có kết quả đánh giá giữa kỳ giai đoạn ba, sẽ được xem xét cấp phép lưu hành.</a><span class=\'meta-news\'>\n            <a class=\'count_cmt\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html#box_comment_vne\' style=\'white-space: nowrap; display: inline-block;\'>\n                <svg class=\'ic ic-comment\'><use xlink:href=\'#Comment-Reg\'></use></svg>\n                <span class=\'font_icon widget-comment-4338511-1\'>13</span>\n            </a>\n        </span></p></li>',
            avatar_url: null,
          },
          tags: [
            {
              id: 2,
              name: '農薬節約栽培',
            },
          ],
        },
        {
          id: 6,
          name: '『大好評』江戸木版画についてご紹介しています。',
          price: 108.63,
          thumb_url: null,
          is_favorite_product: false,
          seller_info: {
            id: 3,
            name: '中台泰夫',
            catch_phrase: '木地部門　伝統工芸士',
            introduction: '<p class=\'description\'>Bộ Y tế điều chỉnh nhóm cần trì hoãn tiêm chủng từ 5 xuống 3, trong Hướng dẫn tạm thời Khám sàng lọc trước khi tiêm vaccine phòng Covid-19, ban hành ngày 10/8.</p>',
            description: '<li><h3 class=\'title_news\'><a data-medium=\'Item-2\' data-thumb=\'0\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html\' title=\'Vaccine trong nước được cấp phép theo cơ chế đặc thù\' data-itm-source=\'#vn_source=Home&amp;vn_campaign=ThuongVien&amp;vn_medium=Item-2&amp;vn_term=Desktop&amp;vn_thumb=0\' data-itm-added=\'1\'>Vaccine trong nước được cấp phép theo cơ chế đặc thù</a></h3><p class=\'description\'><a data-medium=\'Item-2\' data-thumb=\'0\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html\' title=\'Vaccine trong nước được cấp phép theo cơ chế đặc thù\' data-itm-source=\'#vn_source=Home&amp;vn_campaign=ThuongVien&amp;vn_medium=Item-2&amp;vn_term=Desktop&amp;vn_thumb=0\' data-itm-added=\'1\'>Thuốc điều trị, vaccine Covid-19 sản xuất trong nước đang thử nghiệm m sàng, đã có kết quả đánh giá giữa kỳ giai đoạn ba, sẽ được xem xét cấp phép lưu hành.</a><span class=\'meta-news\'>\n            <a class=\'count_cmt\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html#box_comment_vne\' style=\'white-space: nowrap; display: inline-block;\'>\n                <svg class=\'ic ic-comment\'><use xlink:href=\'#Comment-Reg\'></use></svg>\n                <span class=\'font_icon widget-comment-4338511-1\'>13</span>\n            </a>\n        </span></p></li>',
            avatar_url: null,
          },
          tags: [
            {
              id: 2,
              name: '農薬節約栽培',
            },
          ],
        },
        {
          id: 5,
          name: '『大好評』箱根寄木細工についてご紹介しています。',
          price: 45.753,
          thumb_url: null,
          is_favorite_product: false,
          seller_info: {
            id: 1,
            name: '小田原漆器',
            catch_phrase: '木地部門　伝統工芸士',
            introduction: '<p class=\'description\'>Bộ Y tế điều chỉnh nhóm cần trì hoãn tiêm chủng từ 5 xuống 3, trong Hướng dẫn tạm thời Khám sàng lọc trước khi tiêm vaccine phòng Covid-19, ban hành ngày 10/8.</p>',
            description: '<li><h3 class=\'title_news\'><a data-medium=\'Item-2\' data-thumb=\'0\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html\' title=\'Vaccine trong nước được cấp phép theo cơ chế đặc thù\' data-itm-source=\'#vn_source=Home&amp;vn_campaign=ThuongVien&amp;vn_medium=Item-2&amp;vn_term=Desktop&amp;vn_thumb=0\' data-itm-added=\'1\'>Vaccine trong nước được cấp phép theo cơ chế đặc thù</a></h3><p class=\'description\'><a data-medium=\'Item-2\' data-thumb=\'0\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html\' title=\'Vaccine trong nước được cấp phép theo cơ chế đặc thù\' data-itm-source=\'#vn_source=Home&amp;vn_campaign=ThuongVien&amp;vn_medium=Item-2&amp;vn_term=Desktop&amp;vn_thumb=0\' data-itm-added=\'1\'>Thuốc điều trị, vaccine Covid-19 sản xuất trong nước đang thử nghiệm lâm sàng, đã có kết quả đánh giá giữa kỳ giai đoạn ba, sẽ được xem xét cấp phép lưu hành.</a><span class=\'meta-news\'>\n            <a class=\'count_cmt\' href=\'https://vnexpress.net/vaccine-trong-nuoc-duoc-cap-phep-theo-co-che-dac-thu-4338511.html#box_comment_vne\' style=\'white-space: nowrap; display: inline-block;\'>\n                <svg class=\'ic ic-comment\'><use xlink:href=\'#Comment-Reg\'></use></svg>\n                <span class=\'font_icon widget-comment-4338511-1\'>13</span>\n            </a>\n        </span></p></li>',
            avatar_url: null,
          },
          tags: [
            {
              id: 2,
              name: '農薬節約栽培',
            },
          ],
        },
      ],
    },
  );
};

export default withSentry(handler);