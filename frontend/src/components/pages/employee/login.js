import React, {useEffect, useState} from 'react';
import axios from 'axios';
import logo from '../../../assets/images/logo.png'
import background from '../../../assets/images/login_background.png'

export default function EmployeeLogin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const validateLogin = () => {
		if(!username){
			console.log("Username required!");
			return false;
		}
		else if(!password){
			console.log("Password required!");
			return false;
		}
		else {
			return true;
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault();
		if(validateLogin()){
			let value = {username: username, password: password}
			console.log(value);
			// const res = await axios.post(loginRoute, value)
			// console.log(res)
		}
	}

	const handeShowPassword = () => {
		setShowPassword((showPassword) => !showPassword);
	}
    return(
		<div class="container flex md:flex-row w-full h-full justify-center">
			<div class="w-full md:w-1/2">
				<div class="flex flex-col items-center">
					<img 
						src={logo}
						class="max-w-[180px] mt-5" 
					/>
					<div class="md:items-center py-12 md:py-0">
						<div class="text-center uppercase text-[#DE4057] font-bold text-xl mt-1 mb-3">
							<h1>Đăng nhập</h1>
						</div>
						<div class="form-group flex flex-col justify-center mx-2">
							<input type="text"
								class="form-control border-[#DE4057] border-2 rounded-xl px-3 py-2 mb-3 fw-normal" 
								name="username" id="username" placeholder="Tên đăng nhập" 
								required
								onChange={e => setUsername(e.target.value)}
							/>
							<input type="text"
								class="form-control border-[#DE4057] border-2 rounded-xl px-3 py-2 mb-3 fw-normal" 
								type={showPassword? "text":"password"} name="password" id="password" placeholder="Mật khẩu"
								required
								onChange={e => setPassword(e.target.value)} 
								/>
							<div class="form-check form-check-inline">
								<input type="checkbox"
									class="checked:bg-[#DE4057]" 
									id="showPassword" 
									checked = {showPassword}
									onChange={handeShowPassword} 
									/>
								<label class="form-check-label" for="showPassword"> Hiện mật khẩu</label>
							</div>
							<button type="submit"
								class="form-control bg-[#DE4057] text-white rounded-lg px-2 py-1 mt-3 mx-auto
									hover:bg-opacity-95
									active:scale-95 active:bg-opacity-100"
								name="submit" id="submit"
								onClick={e => handleLogin(e)}>Đăng nhập</button>
						</div>
					</div>
				</div>
			</div>
			{/* <div class="collapse md:max-w-1/2 md:visible">
				<img src={background} 
					class="h-full"/>
			</div> */}
		</div>
    );
}