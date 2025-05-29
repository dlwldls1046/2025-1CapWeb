import {
  pageStyle,
  containerStyle,
  sectionStyle,
  titleStyle,
  subtitleStyle,
  listStyle,
  ctaStyle,
  Navbar,
  Footer,
} from '../styles/Elements'

function Intro() {
  return (
    <>
      <div style={pageStyle}>
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
              기반 공격을 빠르게 탐지하며, 보안 지식이 없어도 누구나 쉽게 사용할
              수 있도록 설계되었습니다.
            </p>
            <p>
              <strong>
                지금 바로 패킷을 업로드하고, AI가 알려주는 위협 정보를
                확인해보세요.
              </strong>
            </p>

            <a href="/upload" style={ctaStyle}>
              패킷 업로드 하러 가기
            </a>
            <a href="/Diagram" style={{ ctaStyle, marginLeft: '10px' }}>
              프로젝트 구조도
            </a>
          </div>

          <div style={sectionStyle}>
            <h2 style={subtitleStyle}>AI는 이렇게 작동합니다</h2>
            <p>
              본 시스템은 TCP DUMP로 수집한 보안 공격 데이터를 전처리하여, 각
              공격의 특성을 수치화한 후 머신러닝 모델로 학습시켰습니다.
            </p>
            <ul style={listStyle}>
              <li>
                <strong>Random Forest:</strong> 다양한 공격 패턴을 분류하는
                앙상블 모델
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
      </div>
    </>
  )
}

export default Intro
