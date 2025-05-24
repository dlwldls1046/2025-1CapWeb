function Intro() {
  const pageStyle = {
    background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
    minHeight: '100vh',
  }

  const containerStyle = {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '60px 20px 30px',
    fontFamily: 'sans-serif',
    lineHeight: '1.7',
  }

  const titleStyle = {
    fontSize: '40px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#1e293b',
  }

  const sectionStyle = {
    backgroundColor: '#ffffffcc',
    padding: '30px',
    borderRadius: '14px',
    marginTop: '30px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease',
  }

  const subtitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: '10px',
  }

  const listStyle = {
    paddingLeft: '20px',
    marginTop: '10px',
    marginBottom: '10px',
  }

  const ctaStyle = {
    display: 'inline-block',
    marginTop: '30px',
    backgroundColor: '#1e40af',
    color: '#fff',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  }

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    backgroundColor: '#1f2937',
    color: '#fff',
  }

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '20px',
    fontSize: '16px',
  }

  const footerStyle = {
    marginTop: '50px',
    padding: '15px 30px',
    backgroundColor: '#f1f1f1',
    color: '#444',
    textAlign: 'center',
    fontSize: '14px',
    borderTop: '1px solid #ccc',
  }

  return (
    <>
      <div style={pageStyle}>
        <nav style={navbarStyle}>
          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Capstone Security AI
          </div>
          <div>
            <a href='/' style={linkStyle}>
              홈
            </a>
            <a href='/intro' style={linkStyle}>
              소개
            </a>
            <a href='/attack' style={linkStyle}>
              공격 설명
            </a>
            <a href='/upload' style={linkStyle}>
              패킷 업로드
            </a>
            <a href='/contact' style={linkStyle}>
              문의
            </a>
          </div>
        </nav>

        {/* ✅ 본문 */}
        <div style={containerStyle}>
          <h1 style={titleStyle}>AI 기반 보안 공격 탐지 시스템</h1>

          <div style={sectionStyle}>
            <p>
              이 웹사이트는 사용자가 업로드한 네트워크 패킷(pcap) 파일을 AI가
              자동으로 분석하여,
              <strong> 어떤 보안 공격인지 식별</strong>하고{' '}
              <strong>대응 방안</strong>을 제공합니다.
            </p>
            <p>
              ICMP Flood, SYN Flood, Port Scan, ARP Spoofing 등 다양한 네트워크
              기반 공격을 실시간으로 탐지하며, 보안 지식이 없어도 누구나 쉽게
              사용할 수 있도록 설계되었습니다.
            </p>
            <p>
              <strong>
                지금 바로 패킷을 업로드하고, AI가 알려주는 위협 정보를
                확인해보세요.
              </strong>
            </p>

            <a href='/upload' style={ctaStyle}>
              패킷 업로드 하러 가기
            </a>
          </div>

          <div style={sectionStyle}>
            <h2 style={subtitleStyle}>AI는 이렇게 작동합니다</h2>
            <p>
              본 시스템은 <code>tcpdump</code>로 수집한 보안 공격 데이터를
              전처리하여, 각 공격의 특성을 수치화한 후 머신러닝 모델로
              학습시켰습니다.
            </p>
            <ul style={listStyle}>
              <li>
                <strong>Random Forest:</strong> 다양한 공격 패턴을 분류하는
                앙상블 모델
              </li>
              <li>
                <strong>Isolation Forest:</strong> 이상 트래픽 탐지를 위한
                비지도 학습
              </li>
              <li>
                <strong>CSV 기반 전처리:</strong> tshark로 네트워크 필드를
                추출해 사용
              </li>
            </ul>
            <p style={{ fontWeight: 'bold', marginTop: '15px' }}>분석 흐름:</p>
            <ol style={listStyle}>
              <li>.pcap 파일을 .csv로 자동 변환</li>
              <li>통계 및 피처 추출</li>
              <li>AI 모델이 공격 유형 및 위험도 예측</li>
              <li>공격 이름, 설명, 대응 방안을 제공</li>
            </ol>
            <p>
              이 과정을 통해 <strong>네트워크 보안의 진입 장벽을 낮추고</strong>
              , 누구나 쉽게 자신의 트래픽을 분석할 수 있도록 돕고자 합니다.
            </p>
          </div>
        </div>

        {/* ✅ 푸터 (수정 안 함) */}
        <footer style={footerStyle}>
          © 2025 Capstone Design Project | 2조 [어떡하조]
        </footer>
      </div>
    </>
  )
}

export default Intro
