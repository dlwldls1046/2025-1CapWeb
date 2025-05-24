function Attack() {
  const sectionStyle = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  }

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    backgroundColor: '#1f2937', // dark gray
    color: '#fff',
  }

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '20px',
    fontSize: '16px',
  }

  const footerStyle = {
    marginTop: '40px',
    padding: '15px 30px',
    backgroundColor: '#f1f1f1',
    color: '#444',
    textAlign: 'center',
    fontSize: '14px',
    borderTop: '1px solid #ccc',
  }

  return (
    <div>
      {/* ✅ 네비게이션 바 */}
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
      <div style={{ padding: '30px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>공격별 설명</h2>

        <section style={sectionStyle}>
          <h3>1. ICMP Flood 공격</h3>
          <p>
            ICMP Flood는 대량의 ping 요청을 대상에게 전송하여 네트워크 대역폭을
            고갈시키고 시스템 자원을 소모시키는 DoS(서비스 거부) 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>2. UDP Flood 공격</h3>
          <p>
            UDP Flood는 임의의 포트로 무작위 UDP 패킷을 대량 전송하여, 대상
            시스템이 ICMP 'Port Unreachable' 응답을 생성하게 만들어 자원을
            소모시키는 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>3. SYN Flood 공격</h3>
          <p>
            TCP 연결 요청인 SYN 패킷만을 대량 전송하고 응답을 무시함으로써,
            서버의 세션 큐를 가득 채워 정당한 연결을 방해하는 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>4. Smurf Attack</h3>
          <p>
            공격자가 ICMP Echo Request를 브로드캐스트 주소로 보내면서 출발지를
            피해자로 위조하여, 다수의 시스템으로부터 피해자에게 ICMP 응답이
            몰리게 하는 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>5. Ping of Death</h3>
          <p>
            과도하게 큰 크기의 ping 패킷을 쪼개 전송하여, 대상 시스템이 재조립
            중 버퍼 오버플로우를 일으키게 하는 방식의 서비스 거부 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>6. Port Scan</h3>
          <p>
            공격 대상 시스템에서 열려 있는 포트를 탐색하기 위해 여러 포트에
            연결을 시도하며, 취약한 서비스를 찾는 데 사용됩니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>7. ARP Spoofing</h3>
          <p>
            공격자가 자신을 다른 장치의 MAC 주소로 위장하여 ARP 테이블을
            변조함으로써, 트래픽을 가로채거나 중간자 공격을 수행할 수 있는
            공격입니다.
          </p>
        </section>
      </div>

      {/* ✅ 푸터 */}
      <footer style={footerStyle}>
        © 2025 Capstone Design Project | 2조 [어떡하조]
      </footer>
    </div>
  )
}

export default Attack
