import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeWrapperProps {
  studentName: string;
  courseTitle: string;
  size?: number;
  className?: string;
}

const QRCodeWrapper: React.FC<QRCodeWrapperProps> = ({
  studentName,
  courseTitle,
  size = 80,
  className
}) => {
  const qrValue = `Certificate for ${studentName} - ${courseTitle}`;
  
  return (
    <div className={className}>
      <QRCodeSVG
        value={qrValue}
        size={size}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'L'}
        includeMargin={false}
      />
    </div>
  );
};

export default QRCodeWrapper; 