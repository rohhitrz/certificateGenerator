import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.scss'

// Components
import Form from './components/Form/Form'
import Template1 from './components/Certificate/Template1'
import Template2 from './components/Certificate/Template2'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher'

// Utils
import { downloadAsPdf, downloadAsPng } from './utils/exportUtils'

// Types
interface CertificateData {
  studentName: string
  courseTitle: string
  duration: string
  mentorName: string
  mentorSignature: File | null
  organizationLogo: File | null
  template: string
}

function App() {
  const { t } = useTranslation()
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null)
  const [mentorSignatureUrl, setMentorSignatureUrl] = useState<string | undefined>(undefined)
  const [organizationLogoUrl, setOrganizationLogoUrl] = useState<string | undefined>(undefined)

  const handleFormSubmit = (data: CertificateData) => {
    setCertificateData(data)
    
    // Create URLs for uploaded files
    if (data.mentorSignature) {
      const signatureUrl = URL.createObjectURL(data.mentorSignature)
      setMentorSignatureUrl(signatureUrl)
    } else {
      setMentorSignatureUrl(undefined)
    }
    
    if (data.organizationLogo) {
      const logoUrl = URL.createObjectURL(data.organizationLogo)
      setOrganizationLogoUrl(logoUrl)
    } else {
      setOrganizationLogoUrl(undefined)
    }
  }

  const handleDownloadPdf = () => {
    if (certificateData) {
      downloadAsPdf(
        'certificate-template',
        `${certificateData.studentName}_${certificateData.courseTitle}_Certificate`
      ).catch(error => {
        console.error('Error generating PDF:', error)
      })
    }
  }

  const handleDownloadPng = () => {
    if (certificateData) {
      downloadAsPng(
        'certificate-template',
        `${certificateData.studentName}_${certificateData.courseTitle}_Certificate`
      ).catch(error => {
        console.error('Error generating PNG:', error)
      })
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="appTitle">{t('app.title')}</h1>
          <div className="controls">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </header>
        
        <main className="main">
          <Form onSubmit={handleFormSubmit} />
          
          {certificateData && (
            <div className="certificateContainer">
              {certificateData.template === 'template1' ? (
                <Template1
                  studentName={certificateData.studentName}
                  courseTitle={certificateData.courseTitle}
                  duration={certificateData.duration}
                  mentorName={certificateData.mentorName}
                  mentorSignature={mentorSignatureUrl}
                  organizationLogo={organizationLogoUrl}
                />
              ) : (
                <Template2
                  studentName={certificateData.studentName}
                  courseTitle={certificateData.courseTitle}
                  duration={certificateData.duration}
                  mentorName={certificateData.mentorName}
                  mentorSignature={mentorSignatureUrl}
                  organizationLogo={organizationLogoUrl}
                />
              )}
              
              <div className="downloadButtons">
                <button onClick={handleDownloadPdf}>
                  {t('certificate.downloadAsPdf')}
                </button>
                <button className="button-secondary" onClick={handleDownloadPng}>
                  {t('certificate.downloadAsPng')}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
