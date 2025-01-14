import { useNavigate } from "react-router-dom";

export default function Contact() {
    const navigate = useNavigate()
  const contacts = [
    {
      label: "Email",
      icon: "fa-envelope",
      href: "mailto:wagner_pires@icloud.com",
    },
    {
      label: "Linkedin",
      icon: "fa-linkedin",
      navigate: "https://www.linkedin.com/in/wagnerpferreira/",
    },
    {
      label: "Github",
      icon: "fa-github",
      navigate: "https://github.com/Wpiresferreira",
    },
  ];

  return (
    <div className="fixed bottom-0 flex justify-evenly max-w-[430px] w-[100vw]">
      {contacts.map((contact, index) => (
        <button key = {index} className="bg-white h-12 rounded-full w-12 flex justify-center items-center">
          <span
            onClick={() => {
                if( contact.navigate){
                    window.location = `${contact.navigate}`
                }else{
                    window.location = `${contact.href}?subject=New Stock App&body=Hello!`
                }
            }}
            className={`fa ${contact.icon} text-2xl text-sky-900`}
          ></span>
        </button>
      ))}
    </div>
  );
}
