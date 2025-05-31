import React from 'react'
import { FaGithub } from 'react-icons/fa' // GitHub 아이콘

const members = [
  {
    name: '이지원',
    info: '정보보호학과 22학번',
    role: 'PM, 기획, AI개발, 프론트엔드',
    github: 'https://github.com/leeazyone',
    githubId: 'leeazyone',
  },
  {
    name: '이지인',
    info: '정보보호학과 22학번',
    role: '백엔드, 프론트엔드',
    github: 'https://github.com/dlwldls1046',
    githubId: 'dlwldls1046',
  },
  {
    name: '김시우',
    info: '정보보호학과 22학번',
    role: '백엔드, 프론트엔드',
    github: 'https://github.com/8woo4',
    githubId: '8woo4',
  },
  {
    name: '이태연',
    info: '정보보호학과 20학번',
    role: 'AI개발, 프론트엔드',
    github: 'https://github.com/leetaeyeon11111',
    githubId: 'leetaeyeon11111',
  },
  {
    name: '장재원',
    info: '정보보호학과 20학번',
    role: 'AI개발, 프론트엔드',
    github: 'https://github.com/dodo4421',
    githubId: 'dodo4421',
  },
]

const wrapperStyle = {
  padding: '40px 20px',
  fontFamily: 'sans-serif',
}

const titleStyle = {
  textAlign: 'center',
  fontSize: '32px',
  fontWeight: 'bold',
  marginBottom: '40px',
  color: '#1e293b',
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '20px',
}

const cardStyle = {
  width: '200px',
  border: '1px solid #ccc',
  borderRadius: '12px',
  padding: '16px',
  margin: '10px',
  backgroundColor: '#fff',
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}

const profileImageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  margin: '0 auto 12px',
  backgroundColor: '#eee',
}

export default function Members() {
  return (
    <div style={wrapperStyle}>
      <h2 style={titleStyle}>팀원 소개</h2>
      <div style={containerStyle}>
        {members.map((member, index) => (
          <div key={index} style={cardStyle}>
            <img
              src={`https://github.com/${member.githubId}.png`}
              alt={`${member.name} 프로필`}
              style={profileImageStyle}
            />
            <h3>{member.name}</h3>
            <p>{member.info}</p>
            <p>{member.role}</p>
            <a
              href={member.github}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: '#333',
                marginTop: '10px',
                display: 'inline-block',
              }}
            >
              <FaGithub size={24} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
