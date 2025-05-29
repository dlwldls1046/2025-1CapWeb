import React, { useState } from 'react'

export default function HowToUsePage() {
  const [selectedMethod, setSelectedMethod] = useState('method1')

  const buttonStyle = {
    padding: '10px 20px',
    marginRight: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
  }

  const selectedStyle = {
    ...buttonStyle,
    backgroundColor: '#1976d2',
    color: 'white',
    fontWeight: 'bold',
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        사용법 (Pcap파일 캡쳐 방법)
      </h1>

      {/* 버튼 영역 */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button
          onClick={() => setSelectedMethod('method1')}
          style={selectedMethod === 'method1' ? selectedStyle : buttonStyle}
        >
          Window
        </button>
        <button
          onClick={() => setSelectedMethod('method2')}
          style={selectedMethod === 'method2' ? selectedStyle : buttonStyle}
        >
          Linux (ubuntu)
        </button>
      </div>

      {/* 방법 1 */}
      {selectedMethod === 'method1' && (
        <div>
          <h2>🔹 Window 환경</h2>

          <p> 1. 내 pc 환경에서 pcap파일 캡쳐를 위해 wireshark 설치</p>
          <img
            src="/images/image1.png"
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />

          <p>
            2. 프로그램 실행 후, 실시간으로 패킷을 감지하기 위해 wireshark의
            Adapter for loopback traffic capture 클릭
          </p>
          <img
            src="/images/image2.png"
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />

          <p>
            3. 이후 자동으로 캡쳐 하는것을 확인 또는 curl, ping 명령어등을 통해
            패킷캡쳐
          </p>
          <img
            src="/images/image3.png"
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />
          <p>4. 파일 / 다른이름으로 저장으로 pcap파일 저장</p>
          <img
            src="/images/image4.png"
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />
          <p> 4. Packet school 패킷 탐지 Ai에 업로드</p>
        </div>
      )}

      {/* 방법 2 */}
      {selectedMethod === 'method2' && (
        <div>
          <h2>🔹 Linux (ubuntu) 환경</h2>

          <p>
            1. vmware 설정 내 pc에서 c드라이브 밑 shared 폴더 생성후 사진과 같이
            설정 (Add… 버튼을 눌러 폴더 연결)
          </p>
          <img
            src="/images/image11.png"
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />

          <p>
            2. 터미널을 열어 pcap 저장 시 호스트 연결 설정 (다른 os 에서 할 경우
            세부적인 설정이 필요한 명령어 사용)
          </p>
          <img
            src="/images/image13.png"
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />
          <p>2-1. 터미널에서 호스트 연결 설정 방법과 진행 명령어</p>
          <img
            src="/images/image12.png"
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />
          <p>
            3. 실습을 통한 공격 pcap파일 생성 후 내 호스트 pc에도 생성됐는지
            확인
          </p>
          <img
            src="/images/image22.png"
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />
          <p> 4. Packet school 패킷 탐지 Ai에 업로드</p>
        </div>
      )}
    </div>
  )
}
