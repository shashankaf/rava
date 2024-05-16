import React from 'react'

const SocialMedia = () => {
  return (
    <>
      <div className="bg-white w-full h-auto py-8 flex items-center justify-center gap-4 flex-wrap">
        <button className="w-10 h-10 flex items-center justify-center relative overflow-hidden rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
          <svg className="relative z-10 fill-gray-900 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72" fill="none">
            <path
              d="M46.4927 38.6403L47.7973 30.3588H39.7611V24.9759C39.7611 22.7114 40.883 20.4987 44.4706 20.4987H48.1756V13.4465C46.018 13.1028 43.8378 12.9168 41.6527 12.8901C35.0385 12.8901 30.7204 16.8626 30.7204 24.0442V30.3588H23.3887V38.6403H30.7204V58.671H39.7611V38.6403H46.4927Z"
              fill="" />
          </svg>
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-blue-500 z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-500">
          <svg className="fill-gray-900 relative z-10 transition-all duration-500 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 51 51" fill="none">
            <path
              d="M17.4456 25.7808C17.4456 21.1786 21.1776 17.4468 25.7826 17.4468C30.3875 17.4468 34.1216 21.1786 34.1216 25.7808C34.1216 30.383 30.3875 34.1148 25.7826 34.1148C21.1776 34.1148 17.4456 30.383 17.4456 25.7808ZM12.9377 25.7808C12.9377 32.8708 18.6883 38.618 25.7826 38.618C32.8768 38.618 38.6275 32.8708 38.6275 25.7808C38.6275 18.6908 32.8768 12.9436 25.7826 12.9436C18.6883 12.9436 12.9377 18.6908 12.9377 25.7808ZM36.1342 12.4346C36.1339 13.0279 36.3098 13.608 36.6394 14.1015C36.9691 14.595 37.4377 14.9797 37.9861 15.2069C38.5346 15.4342 39.1381 15.4939 39.7204 15.3784C40.3028 15.2628 40.8378 14.9773 41.2577 14.5579C41.6777 14.1385 41.9638 13.6041 42.0799 13.0222C42.1959 12.4403 42.1367 11.8371 41.9097 11.2888C41.6828 10.7406 41.2982 10.2719 40.8047 9.94202C40.3112 9.61218 39.7309 9.436 39.1372 9.43576H39.136C38.3402 9.43613 37.5771 9.75216 37.0142 10.3144C36.4514 10.8767 36.1349 11.6392 36.1342 12.4346ZM15.6765 46.1302C13.2377 46.0192 11.9121 45.6132 11.0311 45.2702C9.86323 44.8158 9.02993 44.2746 8.15381 43.4002C7.27768 42.5258 6.73536 41.6938 6.28269 40.5266C5.93928 39.6466 5.53304 38.3214 5.42217 35.884C5.3009 33.2488 5.27668 32.4572 5.27668 25.781C5.27668 19.1048 5.3029 18.3154 5.42217 15.678C5.53324 13.2406 5.94248 11.918 6.28269 11.0354C6.73736 9.86816 7.27888 9.03536 8.15381 8.15976C9.02873 7.28416 9.86123 6.74216 11.0311 6.28976C11.9117 5.94656 13.2377 5.54056 15.6765 5.42976C18.3133 5.30856 19.1054 5.28436 25.7826 5.28436C32.4598 5.28436 33.2527 5.31056 35.8916 5.42976C38.3305 5.54076 39.6539 5.94976 40.537 6.28976C41.7049 6.74216 42.5382 7.28536 43.4144 8.15976C44.2905 9.03416 44.8308 9.86816 45.2855 11.0354C45.6289 11.9154 46.0351 13.2406 46.146 15.678C46.2673 18.3154 46.2915 19.1048 46.2915 25.781C46.2915 32.4572 46.2673 33.2466 46.146 35.884C46.0349 38.3214 45.6267 39.6462 45.2855 40.5266C44.8308 41.6938 44.2893 42.5266 43.4144 43.4002C42.5394 44.2738 41.7049 44.8158 40.537 45.2702C39.6565 45.6134 38.3305 46.0194 35.8916 46.1302C33.2549 46.2514 32.4628 46.2756 25.7826 46.2756C19.1024 46.2756 18.3125 46.2514 15.6765 46.1302ZM15.4694 0.932162C12.8064 1.05336 10.9867 1.47536 9.39755 2.09336C7.75177 2.73156 6.35853 3.58776 4.9663 4.97696C3.57406 6.36616 2.71955 7.76076 2.08097 9.40556C1.46259 10.9948 1.04034 12.8124 0.919069 15.4738C0.795795 18.1394 0.767578 18.9916 0.767578 25.7808C0.767578 32.57 0.795795 33.4222 0.919069 36.0878C1.04034 38.7494 1.46259 40.5668 2.08097 42.156C2.71955 43.7998 3.57426 45.196 4.9663 46.5846C6.35833 47.9732 7.75177 48.8282 9.39755 49.4682C10.9897 50.0862 12.8064 50.5082 15.4694 50.6294C18.138 50.7506 18.9893 50.7808 25.7826 50.7808C32.5759 50.7808 33.4286 50.7526 36.0958 50.6294C38.759 50.5082 40.5774 50.0862 42.1676 49.4682C43.8124 48.8282 45.2066 47.9738 46.5989 46.5846C47.9911 45.1954 48.8438 43.7998 49.4842 42.156C50.1026 40.5668 50.5268 38.7492 50.6461 36.0878C50.7674 33.4202 50.7956 32.57 50.7956 25.7808C50.7956 18.9916 50.7674 18.1394 50.6461 15.4738C50.5248 12.8122 50.1026 10.9938 49.4842 9.40556C48.8438 7.76176 47.9889 6.36836 46.5989 4.97696C45.2088 3.58556 43.8124 2.73156 42.1696 2.09336C40.5775 1.47536 38.7588 1.05136 36.0978 0.932162C33.4306 0.810962 32.5779 0.780762 25.7846 0.780762C18.9913 0.780762 18.138 0.808962 15.4694 0.932162Z"
              fill="" />
            <path
              d="M17.4456 25.7808C17.4456 21.1786 21.1776 17.4468 25.7826 17.4468C30.3875 17.4468 34.1216 21.1786 34.1216 25.7808C34.1216 30.383 30.3875 34.1148 25.7826 34.1148C21.1776 34.1148 17.4456 30.383 17.4456 25.7808ZM12.9377 25.7808C12.9377 32.8708 18.6883 38.618 25.7826 38.618C32.8768 38.618 38.6275 32.8708 38.6275 25.7808C38.6275 18.6908 32.8768 12.9436 25.7826 12.9436C18.6883 12.9436 12.9377 18.6908 12.9377 25.7808ZM36.1342 12.4346C36.1339 13.0279 36.3098 13.608 36.6394 14.1015C36.9691 14.595 37.4377 14.9797 37.9861 15.2069C38.5346 15.4342 39.1381 15.4939 39.7204 15.3784C40.3028 15.2628 40.8378 14.9773 41.2577 14.5579C41.6777 14.1385 41.9638 13.6041 42.0799 13.0222C42.1959 12.4403 42.1367 11.8371 41.9097 11.2888C41.6828 10.7406 41.2982 10.2719 40.8047 9.94202C40.3112 9.61218 39.7309 9.436 39.1372 9.43576H39.136C38.3402 9.43613 37.5771 9.75216 37.0142 10.3144C36.4514 10.8767 36.1349 11.6392 36.1342 12.4346ZM15.6765 46.1302C13.2377 46.0192 11.9121 45.6132 11.0311 45.2702C9.86323 44.8158 9.02993 44.2746 8.15381 43.4002C7.27768 42.5258 6.73536 41.6938 6.28269 40.5266C5.93928 39.6466 5.53304 38.3214 5.42217 35.884C5.3009 33.2488 5.27668 32.4572 5.27668 25.781C5.27668 19.1048 5.3029 18.3154 5.42217 15.678C5.53324 13.2406 5.94248 11.918 6.28269 11.0354C6.73736 9.86816 7.27888 9.03536 8.15381 8.15976C9.02873 7.28416 9.86123 6.74216 11.0311 6.28976C11.9117 5.94656 13.2377 5.54056 15.6765 5.42976C18.3133 5.30856 19.1054 5.28436 25.7826 5.28436C32.4598 5.28436 33.2527 5.31056 35.8916 5.42976C38.3305 5.54076 39.6539 5.94976 40.537 6.28976C41.7049 6.74216 42.5382 7.28536 43.4144 8.15976C44.2905 9.03416 44.8308 9.86816 45.2855 11.0354C45.6289 11.9154 46.0351 13.2406 46.146 15.678C46.2673 18.3154 46.2915 19.1048 46.2915 25.781C46.2915 32.4572 46.2673 33.2466 46.146 35.884C46.0349 38.3214 45.6267 39.6462 45.2855 40.5266C44.8308 41.6938 44.2893 42.5266 43.4144 43.4002C42.5394 44.2738 41.7049 44.8158 40.537 45.2702C39.6565 45.6134 38.3305 46.0194 35.8916 46.1302C33.2549 46.2514 32.4628 46.2756 25.7826 46.2756C19.1024 46.2756 18.3125 46.2514 15.6765 46.1302ZM15.4694 0.932162C12.8064 1.05336 10.9867 1.47536 9.39755 2.09336C7.75177 2.73156 6.35853 3.58776 4.9663 4.97696C3.57406 6.36616 2.71955 7.76076 2.08097 9.40556C1.46259 10.9948 1.04034 12.8124 0.919069 15.4738C0.795795 18.1394 0.767578 18.9916 0.767578 25.7808C0.767578 32.57 0.795795 33.4222 0.919069 36.0878C1.04034 38.7494 1.46259 40.5668 2.08097 42.156C2.71955 43.7998 3.57426 45.196 4.9663 46.5846C6.35833 47.9732 7.75177 48.8282 9.39755 49.4682C10.9897 50.0862 12.8064 50.5082 15.4694 50.6294C18.138 50.7506 18.9893 50.7808 25.7826 50.7808C32.5759 50.7808 33.4286 50.7526 36.0958 50.6294C38.759 50.5082 40.5774 50.0862 42.1676 49.4682C43.8124 48.8282 45.2066 47.9738 46.5989 46.5846C47.9911 45.1954 48.8438 43.7998 49.4842 42.156C50.1026 40.5668 50.5268 38.7492 50.6461 36.0878C50.7674 33.4202 50.7956 32.57 50.7956 25.7808C50.7956 18.9916 50.7674 18.1394 50.6461 15.4738C50.5248 12.8122 50.1026 10.9938 49.4842 9.40556C48.8438 7.76176 47.9889 6.36836 46.5989 4.97696C45.2088 3.58556 43.8124 2.73156 42.1696 2.09336C40.5775 1.47536 38.7588 1.05136 36.0978 0.932162C33.4306 0.810962 32.5779 0.780762 25.7846 0.780762C18.9913 0.780762 18.138 0.808962 15.4694 0.932162Z"
              fill="" />
            <defs>
              <radialGradient id="paint0_radial_7092_54404" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(7.41436 51.017) scale(65.31 65.2708)">
                <stop offset="0.09" stop-color="#FA8F21" />
                <stop offset="0.78" stop-color="#D82D7E" />
              </radialGradient>
              <radialGradient id="paint1_radial_7092_54404" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(31.1086 53.257) scale(51.4733 51.4424)">
                <stop offset="0.64" stop-color="#8C3AAA" stop-opacity="0" />
                <stop offset="1" stop-color="#8C3AAA" />
              </radialGradient>
            </defs>
          </svg>
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-gradient-to-bl from-purple-500 via-pink-500 to-yellow-500 z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>

        <button className="w-10 h-10 flex items-center relative overflow-hidden justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
          <svg className="fill-gray-900 relative z-10 transition-all duration-500 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 72 72" fill="none">
            <path
              d="M35.9042 13C23.0034 13 13 22.4537 13 35.2171C13 41.8936 15.737 47.6655 20.1919 51.6508C20.5641 51.9829 20.7931 52.4525 20.8046 52.9563L20.9306 57.0333C20.9397 57.3333 21.0225 57.6264 21.1714 57.8869C21.3204 58.1474 21.5311 58.3674 21.785 58.5274C22.0389 58.6874 22.3282 58.7826 22.6275 58.8047C22.9268 58.8267 23.227 58.7749 23.5016 58.6538L28.048 56.6496C28.4317 56.4779 28.8669 56.4492 29.2734 56.558C31.3634 57.1306 33.5851 57.4398 35.9042 57.4398C48.805 57.4398 58.8084 47.9861 58.8084 35.2228C58.8084 22.4594 48.805 13 35.9042 13Z"
              fill="" />
            <path className="fill-white transition-all duration-500 group-hover:fill-gray-900"
              d="M22.1502 41.7161L28.8783 31.0428C29.1314 30.6409 29.4651 30.2959 29.8583 30.0295C30.2514 29.7631 30.6955 29.5812 31.1626 29.4951C31.6296 29.409 32.1094 29.4206 32.5717 29.5293C33.034 29.638 33.4688 29.8414 33.8485 30.1266L39.2024 34.1406C39.4414 34.3195 39.7322 34.4157 40.0308 34.4147C40.3293 34.4137 40.6194 34.3154 40.8572 34.1348L48.0835 28.6493C49.0455 27.9163 50.3052 29.073 49.6639 30.098L42.93 40.7656C42.6769 41.1674 42.3433 41.5124 41.9501 41.7788C41.5569 42.0452 41.1128 42.2272 40.6458 42.3133C40.1787 42.3994 39.6989 42.3877 39.2366 42.279C38.7743 42.1703 38.3396 41.967 37.9598 41.6818L32.606 37.6678C32.367 37.4889 32.0762 37.3926 31.7776 37.3937C31.479 37.3947 31.1889 37.4929 30.9512 37.6735L23.7249 43.1591C22.7629 43.892 21.5032 42.7411 22.1502 41.7161Z"
              fill="white" />
            <defs>
              <radialGradient id="paint0_radial_7092_54580" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(20.6729 58.8084) scale(50.3892 50.3892)">
                <stop stop-color="#0099FF" />
                <stop offset="0.6" stop-color="#A033FF" />
                <stop offset="0.9" stop-color="#FF5280" />
                <stop offset="1" stop-color="#FF7061" />
              </radialGradient>
            </defs>
          </svg>
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>
        <button className="w-10 h-10 flex relative overflow-hidden items-center justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
          <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white"
            xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 72 72" fill="none">
            <path
              d="M25.4663 54.2563C25.4663 53.4894 25.4663 52.7226 25.4663 51.9558C25.4717 51.9244 25.4706 51.8923 25.463 51.8614C25.4554 51.8305 25.4415 51.8015 25.4221 51.7761C25.4027 51.7507 25.3783 51.7296 25.3503 51.7139C25.3223 51.6983 25.2914 51.6885 25.2595 51.6852C23.3396 51.1452 21.5676 50.1833 20.0755 48.8711C18.9883 47.8921 18.0831 46.7318 17.4011 45.443C16.4398 43.5813 15.8001 41.5734 15.5084 39.5027C15.147 36.9051 15.0214 34.2807 15.1333 31.6609C15.1579 30.4395 15.2209 29.232 15.3611 28.0107C15.5847 25.6897 16.1762 23.4181 17.1137 21.2792C18.2713 18.6495 20.3715 16.5371 23.0092 15.3493C24.806 14.5354 26.6963 13.9411 28.6384 13.5797C30.5428 13.2226 32.471 13.0035 34.4077 12.924C36.1534 12.8628 37.9011 12.8883 39.6443 13.0003C42.1391 13.1045 44.6114 13.5136 47.0049 14.2182C48.7795 14.7246 50.4677 15.4906 52.0137 16.4909C53.5199 17.5145 54.7382 18.9009 55.5538 20.5194C56.5126 22.4097 57.1644 24.4378 57.4851 26.5291C57.6934 27.7706 57.8304 29.023 57.8952 30.2799C57.9863 31.8379 57.9758 33.4027 57.9162 34.9537C57.8566 36.5047 57.7234 38.0106 57.5307 39.5304C57.287 41.8115 56.5787 44.0199 55.4486 46.0224C53.9777 48.5556 51.6214 50.4686 48.8241 51.4006C46.9113 52.0637 44.9363 52.5357 42.9285 52.8094C41.4599 53.0106 39.9878 53.1563 38.5086 53.2153C37.3765 53.2674 36.2444 53.2535 35.1122 53.2362C34.4708 53.2362 33.8329 53.1737 33.1949 53.1182C33.1323 53.1065 33.0676 53.1134 33.009 53.1381C32.9503 53.1628 32.9004 53.2042 32.8655 53.257C31.5756 54.7906 30.2367 56.2826 28.8872 57.7677C28.6414 58.0387 28.3568 58.2725 28.0425 58.4617C27.8362 58.5957 27.6009 58.6798 27.3557 58.7072C27.1105 58.7346 26.8622 58.7045 26.6309 58.6194C26.3996 58.5343 26.1918 58.3965 26.0242 58.2172C25.8566 58.0379 25.7339 57.8222 25.6661 57.5873C25.5325 57.1699 25.4662 56.7343 25.4698 56.2965C25.4663 55.6095 25.4663 54.9329 25.4663 54.2563ZM27.026 57.1674L27.1908 57.0148L30.1175 53.7983C31.2438 52.5607 32.3689 51.322 33.4929 50.0821C33.5481 50.0065 33.6227 49.9467 33.7089 49.9089C33.7951 49.8711 33.8899 49.8566 33.9836 49.867C34.3656 49.9051 34.7477 49.919 35.1332 49.9225C36.4652 49.9225 37.7971 49.9225 39.129 49.8288C40.3383 49.7351 41.544 49.5894 42.7428 49.402C44.0334 49.1796 45.3111 48.8889 46.5703 48.5311C49.3744 47.7851 51.544 46.189 52.9075 43.604C53.7124 42.0147 54.2173 40.2931 54.3971 38.5242C54.6102 36.8569 54.7377 35.18 54.7792 33.4999C54.8413 31.3894 54.6957 29.2779 54.3445 27.1953C54.101 25.6864 53.6628 24.2147 53.0407 22.8164C52.2485 21.0815 51.1269 19.645 49.3989 18.722C46.7491 17.3063 43.8819 16.6748 40.9271 16.3521C40.0894 16.2619 39.2517 16.2133 38.4105 16.1821C36.688 16.0942 34.9619 16.1035 33.2405 16.2099C32.0025 16.3008 30.7712 16.4653 29.5532 16.7026C27.7619 17.0258 26.0291 17.6105 24.4112 18.4375C23.4733 18.9066 22.6224 19.5296 21.8946 20.2799C20.715 21.5851 19.8498 23.138 19.3639 24.8219C18.7876 26.7831 18.473 28.8105 18.4281 30.8524C18.3153 32.8944 18.3411 34.9416 18.5052 36.9801C18.6073 38.1933 18.8125 39.3958 19.1186 40.5748C19.574 42.4122 20.4575 44.1186 21.6983 45.5575C23.038 47.0254 24.7694 48.0887 26.693 48.6248C26.9349 48.6976 27.0435 48.7809 27.0435 49.0516C27.0225 50.0509 27.0435 51.0502 27.0435 52.0495L27.026 57.1674Z"
              fill="" />
            <path
              d="M24.5732 26.1755C24.5487 25.4156 24.9658 24.8639 25.4705 24.3677C26.1362 23.7365 26.8696 23.1792 27.6577 22.7057C28.017 22.4863 28.4443 22.4027 28.861 22.4703C29.2776 22.5379 29.6556 22.7521 29.9254 23.0735C30.8789 24.0657 31.7324 25.1476 32.4736 26.3039C32.8407 26.824 33.1179 27.4009 33.2938 28.011C33.3641 28.2491 33.3687 28.5015 33.3071 28.742C33.2454 28.9824 33.1198 29.2021 32.9433 29.3781C32.539 29.7711 32.108 30.1363 31.6534 30.4711C31.4244 30.6518 31.2541 30.8952 31.1637 31.171C31.0734 31.4468 31.0669 31.7428 31.1452 32.0221C31.4259 33.334 32.062 34.5455 32.9854 35.5266C34.1073 36.8825 35.5529 37.9403 37.1915 38.6044C37.5941 38.8093 38.0554 38.8717 38.4988 38.7813C38.7417 38.7157 38.9575 38.5761 39.1157 38.3823C39.3611 38.0735 39.6275 37.7751 39.8483 37.4454C40.1347 37.0343 40.572 36.7501 41.067 36.6535C41.562 36.5569 42.0756 36.6556 42.4981 36.9284C43.6863 37.6109 44.808 38.4007 45.849 39.2879C46.0943 39.4961 46.3502 39.6973 46.5956 39.909C46.8859 40.1282 47.0955 40.4356 47.1924 40.7841C47.2893 41.1325 47.268 41.5029 47.1318 41.8382C46.9153 42.4022 46.5996 42.9237 46.1995 43.3788C45.7022 44.063 45.0688 44.6392 44.3383 45.0721C43.9891 45.2751 43.5967 45.3943 43.1925 45.4202C42.7884 45.4461 42.3837 45.378 42.0109 45.2213C39.1751 44.091 36.5253 42.5485 34.1491 40.6446C31.8248 38.7505 29.7937 36.5294 28.1203 34.052C26.7123 32.0011 25.5921 29.7705 24.7905 27.4212C24.7052 27.137 24.635 26.8486 24.5802 26.5572C24.5646 26.4305 24.5623 26.3026 24.5732 26.1755Z"
              fill="" />
            <path
              d="M36.6744 22.4835C39.0471 22.527 41.3291 23.3933 43.1226 24.9317C44.9161 26.47 46.1073 28.5826 46.4886 30.9013C46.6421 31.7443 46.7242 32.5985 46.734 33.4551C46.734 33.6563 46.6814 33.802 46.4641 33.8229C46.2468 33.8437 46.1907 33.6598 46.1907 33.4759C46.2233 31.7433 45.864 30.0255 45.1392 28.4481C44.5288 27.152 43.6246 26.0128 42.4969 25.1191C41.3692 24.2255 40.0484 23.6014 38.6373 23.2955C37.8912 23.1245 37.1283 23.036 36.3625 23.0318C36.2879 23.033 36.2135 23.0237 36.1417 23.004C36.0805 22.9869 36.0284 22.947 35.9963 22.8926C35.9643 22.8382 35.9548 22.7737 35.9699 22.7125C35.9704 22.6835 35.9766 22.6549 35.9884 22.6283C36.0001 22.6017 36.0171 22.5777 36.0383 22.5577C36.0595 22.5377 36.0845 22.5221 36.1119 22.5117C36.1393 22.5013 36.1685 22.4965 36.1977 22.4974C36.3555 22.4766 36.5167 22.4835 36.6744 22.4835Z"
              fill="" />
            <path
              d="M43.4406 31.8935C43.4288 30.9296 43.189 29.9818 42.7404 29.1261C42.2918 28.2705 41.6469 27.5308 40.8574 26.9664C39.9359 26.3257 38.8647 25.928 37.7449 25.811C37.5556 25.7867 37.3663 25.7763 37.1735 25.7555C36.9807 25.7346 36.8651 25.6548 36.8826 25.4605C36.9001 25.2662 37.0228 25.1968 37.2331 25.2107C40.3386 25.3981 42.9814 27.1364 43.7946 30.3738C43.9433 30.998 44.0175 31.6373 44.0154 32.2787C44.0154 32.3377 44.0154 32.3967 44.0154 32.4522C44.0154 32.6257 43.9033 32.7402 43.7315 32.7367C43.6934 32.7354 43.656 32.7265 43.6215 32.7104C43.587 32.6944 43.5562 32.6715 43.531 32.6432C43.5057 32.615 43.4865 32.5819 43.4746 32.5461C43.4627 32.5103 43.4583 32.4724 43.4616 32.4348C43.4336 32.2717 43.4406 32.1052 43.4406 31.8935Z"
              fill="" />
            <path
              d="M37.9996 28.028C39.7031 28.1425 40.8913 28.9683 41.2173 30.7622C41.2568 30.992 41.2849 31.2236 41.3014 31.4562C41.3014 31.6436 41.2593 31.8032 41.0525 31.8032C40.8457 31.8032 40.7756 31.6644 40.7686 31.4562C40.7667 30.7686 40.5527 30.0979 40.1552 29.5339C39.7376 29.0231 39.1379 28.6903 38.4798 28.604C38.3327 28.5768 38.184 28.5582 38.0347 28.5485C37.7893 28.5485 37.6526 28.4271 37.6842 28.2397C37.7157 28.0523 37.8629 28.0176 37.9996 28.028Z"
              fill="" />
          </svg>
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-fuchsia-700 z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>
        <button className="w-10 h-10 flex relative overflow-hidden items-center justify-center rounded-full bg-white shadow-md bg-opacity-0 shadow-gray-200 group transition-all duration-500">
          <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white"
            xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 54 41" fill="none">
            <path className=""
              d="M4.00654 40.1236H12.4893V19.5227L0.371094 10.4341V36.4881C0.371094 38.4997 2.00099 40.1236 4.00654 40.1236Z"
              fill="" />
            <path className=""
              d="M41.5732 40.1236H50.056C52.0676 40.1236 53.6914 38.4937 53.6914 36.4881V10.4341L41.5732 19.5227"
              fill="" />
            <path className=""
              d="M41.5732 3.7693V19.5229L53.6914 10.4343V5.58702C53.6914 1.09118 48.5594 -1.47181 44.9663 1.22448"
              fill="" />
            <path className=""
              d="M12.4893 19.5227V3.76904L27.0311 14.6754L41.5729 3.76904V19.5227L27.0311 30.429"
              fill="" />
            <path className=""
              d="M0.371094 5.58702V10.4343L12.4893 19.5229V3.7693L9.09617 1.22448C5.49708 -1.47181 0.371094 1.09118 0.371094 5.58702Z"
              fill="" />
          </svg>
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-red-500 z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>

        <button className="w-10 h-10 flex items-center relative overflow-hidden justify-center rounded-full bg-white shadow-md shadow-gray-200 group transition-all duration-300">
          <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white"
            xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 72 72" fill="none">
            <path
              d="M61.1026 23.7185C60.5048 21.471 58.7363 19.6981 56.4863 19.0904C52.4181 18 36.0951 18 36.0951 18C36.0951 18 19.7805 18 15.7039 19.0904C13.4622 19.6897 11.6937 21.4627 11.0876 23.7185C10 27.7971 10 36.3124 10 36.3124C10 36.3124 10 44.8276 11.0876 48.9063C11.6854 51.1537 13.4539 52.9267 15.7039 53.5343C19.7805 54.6247 36.0951 54.6247 36.0951 54.6247C36.0951 54.6247 52.4181 54.6247 56.4863 53.5343C58.728 52.935 60.4965 51.162 61.1026 48.9063C62.1902 44.8276 62.1902 36.3124 62.1902 36.3124C62.1902 36.3124 62.1902 27.7971 61.1026 23.7185Z"
              fill="" />
            <path className="fill-white transition-all duration-300 group-hover:fill-[#FF3000]"
              d="M30.8811 44.1617L44.4392 36.3124L30.8811 28.463V44.1617Z" fill="white" />
          </svg>
          <div className="absolute top-full left-0 w-full h-full rounded-full bg-[#FF3000] z-0 transition-all duration-500 group-hover:top-0"></div>
        </button>
      </div>

    </>
  )
}

export default SocialMedia
