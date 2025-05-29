function Diagram() {
  return (
    <div
      style={{ padding: '2rem', fontFamily: 'sans-serif', lineHeight: '1.6' }}
    >
      <h2
        style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}
      >
        Project Diagram
      </h2>

      <p style={{ marginBottom: '1.5rem', color: '#444' }}>
        본 프로젝트는 AI 기반 보안 분석 시스템으로, PCAP 파일을 업로드하면 Flask
        서버를 통해 AI 모델이 분석을 수행하고, 클라이언트에서 결과를 시각적으로
        확인할 수 있는 구조입니다.
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src='/images/Diagram.jpg'
          alt='Project Diagram'
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
            border: '1px solid #ddd',
          }}
        />
      </div>
    </div>
  )
}

export default Diagram
