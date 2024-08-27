// import { useRouter } from 'next/router';
//
// export function VideoPage() {
//     const router = useRouter();
//     const { id} = router.query;
//
//     // Now you can use `id` in your component...
//
//     return (
//         <div style={{ backgroundColor: '#333', color: '#fff', height: '100vh', padding: '20px' }}>
//             <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//                 {/* 视频播放区域 */}
//                 <div style={{ backgroundColor: '#000', height: '450px', position: 'relative' }}>
//                     {/* 这里预留给你置入播放链接 */}
//                     <button
//                         style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             padding: '10px 20px',
//                             backgroundColor: '#555',
//                             border: 'none',
//                             color: '#fff',
//                             cursor: 'pointer',
//                         }}
//                     >
//                         Play
//                     </button>
//                 </div>
//
//                 {/* 集数列表 */}
//                 <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px', textAlign: 'left' }}>
//                     <li style={{ padding: '10px 0', borderBottom: '1px solid #444' }}>
//                         <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>第01集</a>
//                     </li>
//                     <li style={{ padding: '10px 0', borderBottom: '1px solid #444' }}>
//                         <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>第02集</a>
//                     </li>
//                     {/* 可以添加更多集数 */}
//                 </ul>
//             </div>
//         </div>
//     );
// }
//
// export default VideoPage;