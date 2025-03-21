import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Form.module.scss';

interface FormData {
  studentName: string;
  courseTitle: string;
  duration: string;
  mentorName: string;
  mentorSignature: File | null;
  organizationLogo: File | null;
  template: string;
}

interface FormErrors {
  studentName?: string;
  courseTitle?: string;
  mentorName?: string;
  mentorSignature?: string;
  organizationLogo?: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const mentorSignatureRef = useRef<HTMLInputElement>(null);
  const organizationLogoRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    courseTitle: '',
    duration: '',
    mentorName: '',
    mentorSignature: null,
    organizationLogo: null,
    template: 'template1'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [mentorSignaturePreview, setMentorSignaturePreview] = useState<string | null>(null);
  const [organizationLogoPreview, setOrganizationLogoPreview] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: t('validation.fileSize')
        }));
        return;
      }
      
      // Validate file type
      if (!file.type.match('image.*')) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: t('validation.fileType')
        }));
        return;
      }
      
      // Update form data with file
      setFormData(prev => ({ ...prev, [name]: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'mentorSignature') {
          setMentorSignaturePreview(reader.result as string);
        } else if (name === 'organizationLogo') {
          setOrganizationLogoPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const removeFile = (name: 'mentorSignature' | 'organizationLogo') => {
    setFormData(prev => ({ ...prev, [name]: null }));
    
    if (name === 'mentorSignature') {
      setMentorSignaturePreview(null);
      if (mentorSignatureRef.current) {
        mentorSignatureRef.current.value = '';
      }
    } else if (name === 'organizationLogo') {
      setOrganizationLogoPreview(null);
      if (organizationLogoRef.current) {
        organizationLogoRef.current.value = '';
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.studentName.trim()) {
      newErrors.studentName = t('validation.required');
    }
    
    if (!formData.courseTitle.trim()) {
      newErrors.courseTitle = t('validation.required');
    }
    
    if (!formData.mentorName.trim()) {
      newErrors.mentorName = t('validation.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      studentName: '',
      courseTitle: '',
      duration: '',
      mentorName: '',
      mentorSignature: null,
      organizationLogo: null,
      template: 'template1'
    });
    setErrors({});
    setMentorSignaturePreview(null);
    setOrganizationLogoPreview(null);
    
    if (mentorSignatureRef.current) {
      mentorSignatureRef.current.value = '';
    }
    
    if (organizationLogoRef.current) {
      organizationLogoRef.current.value = '';
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>{t('app.title')}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="studentName">
            {t('form.studentName')} *
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            placeholder={t('form.studentNamePlaceholder')}
            className={`${styles.input} ${errors.studentName ? styles.error : ''}`}
          />
          {errors.studentName && (
            <p className={styles.errorText}>{errors.studentName}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="courseTitle">
            {t('form.courseTitle')} *
          </label>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            placeholder={t('form.courseTitlePlaceholder')}
            className={`${styles.input} ${errors.courseTitle ? styles.error : ''}`}
          />
          {errors.courseTitle && (
            <p className={styles.errorText}>{errors.courseTitle}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="duration">
            {t('form.duration')}
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder={t('form.durationPlaceholder')}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="mentorName">
            {t('form.mentorName')} *
          </label>
          <input
            type="text"
            id="mentorName"
            name="mentorName"
            value={formData.mentorName}
            onChange={handleInputChange}
            placeholder={t('form.mentorNamePlaceholder')}
            className={`${styles.input} ${errors.mentorName ? styles.error : ''}`}
          />
          {errors.mentorName && (
            <p className={styles.errorText}>{errors.mentorName}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t('form.mentorSignature')}
          </label>
          <label 
            className={`${styles.fileInputLabel} ${mentorSignaturePreview ? styles.hasFile : ''}`} 
            htmlFor="mentorSignature"
          >
            <span>{t('form.mentorSignatureHelp')}</span>
          </label>
          <input
            type="file"
            id="mentorSignature"
            name="mentorSignature"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
            ref={mentorSignatureRef}
          />
          {errors.mentorSignature && (
            <p className={styles.errorText}>{errors.mentorSignature}</p>
          )}
          {mentorSignaturePreview && (
            <div className={styles.filePreview}>
              <img src={mentorSignaturePreview} alt="Mentor Signature Preview" />
              <span className={styles.fileName}>
                {formData.mentorSignature?.name}
              </span>
              <button 
                type="button" 
                className={styles.removeButton}
                onClick={() => removeFile('mentorSignature')}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t('form.organizationLogo')}
          </label>
          <label 
            className={`${styles.fileInputLabel} ${organizationLogoPreview ? styles.hasFile : ''}`} 
            htmlFor="organizationLogo"
          >
            <span>{t('form.organizationLogoHelp')}</span>
          </label>
          <input
            type="file"
            id="organizationLogo"
            name="organizationLogo"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
            ref={organizationLogoRef}
          />
          {errors.organizationLogo && (
            <p className={styles.errorText}>{errors.organizationLogo}</p>
          )}
          {organizationLogoPreview && (
            <div className={styles.filePreview}>
              <img src={organizationLogoPreview} alt="Organization Logo Preview" />
              <span className={styles.fileName}>
                {formData.organizationLogo?.name}
              </span>
              <button 
                type="button" 
                className={styles.removeButton}
                onClick={() => removeFile('organizationLogo')}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.templateSelect}`}>
          <label className={styles.label} htmlFor="template">
            {t('certificate.template')}
          </label>
          <select
            id="template"
            name="template"
            value={formData.template}
            onChange={handleInputChange}
            className={styles.input}
          >
            <option value="template1">{t('certificate.template1')}</option>
            <option value="template2">{t('certificate.template2')}</option>
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit">
            {t('form.generate')}
          </button>
          <button 
            type="button" 
            className="button-secondary" 
            onClick={handleReset}
          >
            {t('form.reset')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form; 