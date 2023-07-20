import React, { useState } from "react";

export default function EmployeeManaging() {

    return(
        <div className="container">
            <div className="app-wrapper">
                <h1>Breadcum!</h1>
            </div>
            <div className="app-wrapper">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">CCCD</th>
                            <th scope="col">Xem</th>
                            <th scope="col">Sửa</th>
                            <th scope="col">Xoá</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <th scope="row">Nguyễn Văn A</th>
                            <th scope="row">012345678901</th>
                            <th scope="row">
                                <button type="button" 
                                    name="modal-popup" 
                                    id="view" 
                                    >Xem</button>
                            </th>
                            <th scope="row">
                            <button type="button" 
                                    name="modal-popup" 
                                    id="edit" 
                                    >Sửa</button>
                            </th>
                            <th scope="row">
                            <button type="button" 
                                    name="modal-popup" 
                                    id="delete" 
                                    >Xoá</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="app-wrapper">
                <h1>Paging!</h1>
            </div>
            
                
        </div>
    );
}