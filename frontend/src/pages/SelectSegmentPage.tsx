import React from 'react';
import { SegmentsDropdown } from 'src/components/content/RegisterPageContent';
import LoadingSpinner from 'src/components/ui/LoadingSpinner';
import { useAllSegments } from 'src/hooks/segmentHooks';
export default function SelectSegmentPage() {
    const {data, isLoading} = useAllSegments();
    if (isLoading) {
        return (
          <div className="wrapper">
            <LoadingSpinner />
          </div>
        )
      }
    
      return (
        <div className="wrapper">
        <SegmentsDropdown segments={data}/>
        </div>
      )
}