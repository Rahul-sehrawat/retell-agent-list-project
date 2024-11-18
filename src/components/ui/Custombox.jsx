import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { RiVoiceprintLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { FaHashtag } from "react-icons/fa6";

export default function Custombox({ agent_name }) {
  const [activeSection, setActiveSection] = useState('voice'); // this is for left sidebar
  const [activeToggle, setActiveToggle] = useState('call');  // this is for right sidebar

  return (
    <div className="flex h-[90%] w-[70%] bg-gray-100">
      <div className="flex-1 flex flex-col">
        <header className="bg-purple-600 text-white text-center py-4 font-bold">
          {agent_name}
        </header>

        <div className="flex flex-1">
          {/* left sidebar with buttons */}
          <section className="w-20 bg-white shadow-lg flex flex-col items-center py-4 space-y-6 border-r-2">
            <button
              onClick={() => setActiveSection('voice')}
              className={`p-2 rounded-full ${activeSection === 'voice' ? 'bg-purple-200' : ''}`}
            >
              <RiVoiceprintLine size={30} />
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className={`p-2 rounded-full ${activeSection === 'settings' ? 'bg-purple-200' : ''}`}
            >
              <IoMdSettings size={30} />
            </button>
            <button
              onClick={() => setActiveSection('calendar')}
              className={`p-2 rounded-full ${activeSection === 'calendar' ? 'bg-purple-200' : ''}`}
            >
              <SlCalender size={30} />
            </button>
            <button
              onClick={() => setActiveSection('tags')}
              className={`p-2 rounded-full ${activeSection === 'tags' ? 'bg-purple-200' : ''}`}
            >
              <FaHashtag size={30} />
            </button>
          </section>

          {/* 2nd Left sidebar Conditional Rendering  */}
          <section className="w-1/4 bg-white border-r p-4">
            {activeSection === 'voice' && (
              <>
                <h3 className="text-lg font-semibold mb-4">Select Voice</h3>
                <Input placeholder="Search Voice/Language" className="mb-4 rounded-xl" />
                <div className="space-y-8">
                  {['English', 'Spanish'].map((language) => (
                    <div key={language}>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        {language}
                      </h4>
                      <div className="space-y-2">
                        {['Marie', 'Sarah', 'Mark', 'Sam'].map((name, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-blue-200 p-2 rounded-xl"
                          >
                            <span>{name}</span>
                            <Button className="rounded-xl bg-purple-200 p-1" size="xs" variant="outline">
                              {index % 2 === 0 ? 'Female' : 'Male'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeSection === 'settings' && (
              <>
                <h3 className="text-lg font-semibold mb-4">Settings</h3>
                <Input placeholder="Search Settings" className="mb-4 rounded-xl" />
                <div className="space-y-4">
                  <Input placeholder="Setting 1" />
                  <Input placeholder="Setting 2" />
                  <Input placeholder="Setting 3" />
                  <Button className="w-full bg-purple-600 text-white">Save Settings</Button>
                </div>
              </>
            )}

            {activeSection === 'calendar' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Calendar</h3>
                <p>Hiiiii! This is the calendar section.</p>
              </div>
            )}

            {activeSection === 'tags' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <p>Heyyyyy! This is the tags section.</p>
              </div>
            )}
          </section>

          {/* name and prompt Section */}
          <main className="flex-1 p-6 bg-gray-50">
            <div className="space-y-2">
              <label htmlFor="Name" className='font-bold' >Name</label>
              <Input  className="w-full" />
              <br/>
              <label htmlFor="" className=' font-bold ' >Prompt</label>
              <Textarea  className="w-full h-80 rounded-xl" />
            </div>
          </main>

          {/* Rightmost  Sidebar */}
          <aside className="w-1/4 bg-white border-l p-6 space-y-4">
            {/* Toggle Switch */}
            <div className="flex space-x-2 bg-purple-400 p-2 rounded-xl">
              <Toggle
                size="md"
                active={activeToggle === 'call'}
                onClick={() => setActiveToggle('call')}
                className={`flex-1 text-center p-2 rounded-lg ${activeToggle === 'call' ? 'bg-purple-600 text-white rounded-xl' : 'bg-purple-400'}`}
              >
                Test Call
              </Toggle>
              <Toggle
                size="md"
                active={activeToggle === 'chat'}
                onClick={() => setActiveToggle('chat')}
                className={`flex-1 text-center p-2 rounded-lg ${activeToggle === 'chat' ? 'bg-purple-600 text-white rounded-xl' : 'bg-purple-400'}`}
              >
                Test Chat
              </Toggle>
            </div>

            {activeToggle === 'call' && (
              <div className="space-y-4">
                <Input placeholder="Select Phone Number" className = 'bg-purple-200' />
                <Input placeholder="Enter Name" className = 'bg-purple-200'  />
                <Input placeholder="Enter Phone Number" className = 'bg-purple-200'  />
                <Button className="w-full bg-purple-600 text-white">Call Me</Button>
              </div>
            )}
            {activeToggle === 'chat' && (
              <div className="space-y-4">
                <Textarea placeholder="Enter your message..." className="w-full h-24 rounded-xl" />
                <Button className="w-full bg-purple-600 text-white">Send Message</Button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

