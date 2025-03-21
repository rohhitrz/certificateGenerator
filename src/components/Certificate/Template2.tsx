import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Certificate.module.scss';
import QRCodeWrapper from './QRCodeWrapper';
import { formatCurrentDate } from '../../utils/exportUtils';

interface Template2Props {
  studentName: string;
  courseTitle: string;
  duration?: string;
  mentorName: string;
  mentorSignature?: string;
  organizationLogo?: string;
}

const Template2: React.FC<Template2Props> = ({
  studentName,
  courseTitle,
  duration,
  mentorName,
  mentorSignature,
  organizationLogo
}) => {
  const { t } = useTranslation();
  const currentDate = formatCurrentDate();

  return (
    <div className={styles.template2} id="certificate-template">
      {organizationLogo && (
        <img 
          src={organizationLogo} 
          alt="Organization Logo" 
          className={styles.logo}
        />
      )}
      
      <h1 className={styles.title}>{t('certificate.certificateOf')}</h1>
      <p className={styles.subtitle}>{t('certificate.issuedTo')}</p>
      
      <div className={styles.content}>
        <div className={styles.studentLabel}>{t('form.studentName')}:</div>
        <div className={styles.studentName}>{studentName}</div>
        
        <div className={styles.courseLabel}>{t('form.courseTitle')}:</div>
        <div className={styles.courseTitle}>{courseTitle}</div>
        
        {duration && (
          <div className={styles.duration}>
            {t('certificate.duration')}: {duration}
          </div>
        )}
        
        <div className={styles.date}>
          {t('certificate.issuedOn')}: {currentDate}
        </div>
        
        <div className={styles.signature}>
          {mentorSignature && (
            <img 
              src={mentorSignature} 
              alt="Mentor Signature" 
            />
          )}
          <div className={styles.mentorName}>{mentorName}</div>
          <div className={styles.mentorTitle}>{t('certificate.mentorSignature')}</div>
        </div>
      </div>
      
      <div className={styles.qrCode}>
        <QRCodeWrapper
          studentName={studentName}
          courseTitle={courseTitle}
        />
      </div>
    </div>
  );
};

export default Template2; 