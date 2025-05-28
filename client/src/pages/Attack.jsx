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

function Attack() {
  return (
    <div>
      <div style={{ padding: '30px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>공격별 설명</h2>

        <section style={sectionStyle}>
          <h3>
            1. ICMP Flood 공격
            <a
              href='https://www.akamai.com/ko/glossary/what-is-icmp-flood-ddos-attack'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '10px', fontSize: '14px', color: '#007bff' }}
            >
              더 알아보기
            </a>
          </h3>
          <p>
            ICMP Flood는 대량의 ping 요청을 대상에게 전송하여 네트워크 대역폭을
            고갈시키고 시스템 자원을 소모시키는 DoS(서비스 거부) 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>
            2. UDP Flood 공격
            <a
              href='https://www.akamai.com/ko/glossary/what-is-udp-flood-ddos-attack'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '10px', fontSize: '14px', color: '#007bff' }}
            >
              더 알아보기
            </a>
          </h3>
          <p>
            UDP Flood는 임의의 포트로 무작위 UDP 패킷을 대량 전송하여, 대상
            시스템이 ICMP 'Port Unreachable' 응답을 생성하게 만들어 자원을
            소모시키는 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>
            3. SYN Flood 공격
            <a
              href='https://blog.naver.com/techtrip/222561492285'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '10px', fontSize: '14px', color: '#007bff' }}
            >
              더 알아보기
            </a>
          </h3>
          <p>
            TCP 연결 요청인 SYN 패킷만을 대량 전송하고 응답을 무시함으로써,
            서버의 세션 큐를 가득 채워 정당한 연결을 방해하는 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>
            4. Smurf Attack
            <a
              href='https://www.fortinet.com/kr/resources/cyberglossary/smurf-attack'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '10px', fontSize: '14px', color: '#007bff' }}
            >
              더 알아보기
            </a>
          </h3>
          <p>
            공격자가 ICMP Echo Request를 브로드캐스트 주소로 보내면서 출발지를
            피해자로 위조하여, 다수의 시스템으로부터 피해자에게 ICMP 응답이
            몰리게 하는 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>
            5. Ping of Death
            <a
              href='https://hdacker.tistory.com/8'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '10px', fontSize: '14px', color: '#007bff' }}
            >
              더 알아보기
            </a>
          </h3>
          <p>
            과도하게 큰 크기의 ping 패킷을 쪼개 전송하여, 대상 시스템이 재조립
            중 버퍼 오버플로우를 일으키게 하는 방식의 서비스 거부 공격입니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>
            6. Port Scan
            <a
              href='https://www.fortinet.com/kr/resources/cyberglossary/what-is-port-scan'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '10px', fontSize: '14px', color: '#007bff' }}
            >
              더 알아보기
            </a>
          </h3>
          <p>
            공격 대상 시스템에서 열려 있는 포트를 탐색하기 위해 여러 포트에
            연결을 시도하며, 취약한 서비스를 찾는 데 사용됩니다.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3>
            7. ARP Spoofing
            <a
              href='https://blog.naver.com/PostView.naver?blogId=novajini&logNo=220151617774'
              target='_blank'
              rel='noopener noreferrer'
              style={{ marginLeft: '10px', fontSize: '14px', color: '#007bff' }}
            >
              더 알아보기
            </a>
          </h3>
          <p>
            공격자가 자신을 다른 장치의 MAC 주소로 위장하여 ARP 테이블을
            변조함으로써, 트래픽을 가로채거나 중간자 공격을 수행할 수 있는
            공격입니다.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Attack
