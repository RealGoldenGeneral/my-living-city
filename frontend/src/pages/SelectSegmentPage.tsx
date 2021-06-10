import React, { useState} from 'react';
import { SegmentsDropdown } from 'src/components/content/RegisterPageContent';
import LoadingSpinner from 'src/components/ui/LoadingSpinner';
import { useAllSegments } from 'src/hooks/segmentHooks';
import { getAllSubSegmentsWithId } from 'src/lib/api/segmentRoutes';
import { ISegment, ISubSegment } from 'src/lib/types/data/segment.type';
// export default function SelectSegmentPage(segment: ISegment) {
//   if (isLoading) {
//             return (
//               <div className="wrapper">
//                 <LoadingSpinner />
//               </div>
//             )
//           }
//           if(data){
//             const filteredSegments = data.filter(seg => seg.name === segments[0] || seg.name === segments[1]);
//             if(filteredSegments.length>0 && (called === false)){
//               getSubSegments(String(filteredSegments[0].segId));
//               setCalled(true);
//               console.log(called);
//             }
//             console.log(filteredSegments);
//             if(filteredSegments.length>0){
//               return (
//                 <div>
//                   <SegmentsDropdown segments={filteredSegments}/>
//                 </div>
//               )
//             }
// }
// export default function SelectSegmentPage(segments: any) {
//   async function getSubSegments(id: string){
//     try{
//       const subSegments = await getAllSubSegmentsWithId(id);
//       console.log(subSegments);
//     }catch(err){
//       console.log(err);
//     }
//   }
//   const [called, setCalled] = useState(false);
//     const segments = googleSegments.googleSegments;
//     const {data, isLoading} = useAllSegments();
//     if (isLoading) {
//         return (
//           <div className="wrapper">
//             <LoadingSpinner />
//           </div>
//         )
//       }
//       if(data){
//         const filteredSegments = data.filter(seg => seg.name === segments[0] || seg.name === segments[1]);
//         if(filteredSegments.length>0 && (called === false)){
//           getSubSegments(String(filteredSegments[0].segId));
//           setCalled(true);
//           console.log(called);
//         }
//         console.log(filteredSegments);
//         if(filteredSegments.length>0){
//           return (
//             <div>
//               <SegmentsDropdown segments={filteredSegments}/>
//             </div>
//           )
//         }else{
//           return(
//             <div><h3>Place holder for segment request</h3></div>
//           )
//         }

//       }
      
        
//     // console.log(filterSegments);
    
//       return (
        
//         <div>
//           <h1>Place holder for request sub-segment</h1>
//         </div>
//       )
// }